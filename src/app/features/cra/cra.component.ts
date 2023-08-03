import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarOptions, DateSelectArg } from '@fullcalendar/core';
import frLocale from '@fullcalendar/core/locales/fr';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import { format } from 'date-fns';
import { HolidayService } from 'src/app/core/service/holiday-service';
import { CreateCraModalComponent } from 'src/app/core/template/components/create-cra-modal/create-cra-modal.component';
import { ErrorHandlerService } from 'src/app/core/template/components/error-dialog/error-handler.service';
import { SucessHandlerService } from 'src/app/core/template/components/success-dialog/success-dialog.service';
import { CraService } from '../../core/service/cra-service';
import { IActivity } from 'src/app/core/model/cra-model';

type CustomHoliday = {
  title: string;
  date: string;
  display: string;
  color: string;
};

@Component({
  selector: 'app-cra',
  templateUrl: './cra.component.html',
  styleUrls: ['./cra.component.scss'],
})
export class CraComponent implements OnInit {
  HOLIDAYS: CustomHoliday[] = [];
  title: string = "Création d'un compte rendu d'activité";
  dialogConfig: any = {
    height: '250px',
    width: '350px',
    disableClose: true,
    data: {},
  };
  isFormValid: boolean = false;
  events: any[] = [];
  craObj: any;
  craToSubmit: any = [];

  constructor(
    public dialog: MatDialog,
    private craService: CraService,
    private errorService: ErrorHandlerService,
    private successService: SucessHandlerService,
    private holidaysService: HolidayService
  ) {}

  ngOnInit() {
    this.holidaysService.getPublicHolidays().subscribe((res) => {
      this.HOLIDAYS = res.map((d) => {
        return {
          title: d.localName,
          date: d.date,
          display: 'background',
          color: 'gray',
        };
      });

      const weekEnds = this.holidaysService.getWeekEnds();
      const addEvents = [...this.HOLIDAYS, ...weekEnds];

      // set all events
      this.events = addEvents;
      this.calendarOptions.events = addEvents;
    });
  }

  calendarOptions: CalendarOptions = {
    locales: [frLocale],
    locale: 'fr',
    initialView: 'dayGridMonth',
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleSeclectedDay.bind(this),
    height: '650px',
  };

  handleSeclectedDay(selectInfo: DateSelectArg) {
    const dialogRef = this.dialog.open(CreateCraModalComponent, {
      height: '650px',
      width: '600px',
      disableClose: true,
      data: {
        date: selectInfo.start,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.isFormValid = result.isFormValid;

      const craTitle = result.craObj.activities
        .map((act: any) => act.category.replaceAll('_', ' '))
        .join(' / ');

      const newCra = {
        title: craTitle,
        start: format(result.craObj.startDate, 'yyyy-MM-dd'),
        end: this.adjustEndDate(result.craObj.endDate),
        color: 'blue',
        textColor: 'white',
      };

      this.calendarOptions.events = [...this.events, newCra];
      this.events.push(newCra);

      const dates = this.getDatesArray(
        result.craObj.startDate,
        result.craObj.endDate
      );

      let activities: IActivity[] = [];
      for (let j = 0; j < dates.length; j++) {
        for (let i = 0; i < result.craObj.activities.length; i++) {
          activities.push({
            date: format(dates[j], 'yyyy-MM-dd'),
            quantity: result.craObj.activities[i].quantity,
            category: result.craObj.activities[i].category,
            comment: result.craObj.activities[i].comment,
          });
        }
      }

      this.craToSubmit.push(...activities);
    });
  }

  // ********* FORM (handling) *********
  onSubmitCra(): void {
    if (!this.isFormValid) return;
    this.craService.createCra({ activities: this.craToSubmit }).subscribe(
      (res) => {
        this.dialogConfig.data = {
          successMessage: "La soumission du CRA s'est déroulé avec succès",
        };
        this.successService.handleSuccess(this.dialogConfig);
      },
      (err) => {
        console.log('ERR: ', err);
        this.dialogConfig.data = { errorMessage: err.error.message };
        this.errorService.handleError(this.dialogConfig);
      }
    );
  }

  adjustEndDate(date: string) {
    const currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() + 1);
    return format(currentDate, 'yyyy-MM-dd');
  }

  getDatesArray(startDate: Date, endDate: Date): Date[] {
    const datesArray: Date[] = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      datesArray.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return datesArray;
  }
}
