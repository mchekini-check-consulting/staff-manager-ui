import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  CalendarOptions,
  DateSelectArg,
  EventInput,
  EventSourceInput,
} from '@fullcalendar/core';
import frLocale from '@fullcalendar/core/locales/fr';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import { format, isWeekend } from 'date-fns';
import { ErrorHandlerService } from 'src/app/core/template/components/error-dialog/error-handler.service';
import { CreateCraModalComponent } from 'src/app/core/template/components/create-cra-modal/create-cra-modal.component';
import { SucessHandlerService } from 'src/app/core/template/components/success-dialog/success-dialog.service';
import { CraService } from '../../core/service/cra-service';
import { CraModel } from 'src/app/core/model/cra-model';
import { HolidayService } from 'src/app/core/service/holiday-service';

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
    });

    const weekEnds = this.holidaysService.getWeekEnds();

    const addEvents = [...this.HOLIDAYS, ...weekEnds];

    // set all events
    this.events = addEvents;
    this.calendarOptions.events = addEvents;
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
      let newCra;

      this.isFormValid = result.isFormValid;
      this.craObj = result.craObj;

      const craTitle = result.craObj.activities
        .map((act: any) => act.category.split('_').join(' '))
        .join(' / ');

      if (result.craObj.startDate !== result.craObj.endDate) {
        newCra = {
          title: craTitle,
          start: result.craObj.startDate,
          end: this.adjustEndDate(result.craObj.endDate),
          color: 'blue',
          textColor: 'white',
        };
      } else {
        newCra = {
          title: craTitle,
          date: result.craObj.startDate,
          color: 'blue',
          textColor: 'white',
        };
      }

      this.calendarOptions.events = [...this.events, newCra];
      this.events.push(newCra);
    });
  }

  // ********* FORM (handling) *********
  onSubmitCra(): void {
    if (!this.isFormValid) return;

    const craToSubmit = {
      activities: this.craObj?.activities.map((act: any, idx: number) => {
        return {
          date:
            idx === 0
              ? this.craObj.startDate
              : this.adjustEndDate(this.craObj.startDate),
          quantity: act.quantity,
          category: act.category,
          comment: act.comment,
        };
      }),
    };

    this.craService.createCra(craToSubmit).subscribe(
      (res) => {
        this.dialogConfig.data = {
          successMessage: "La soumission du CRA s'est déroulé avec succès",
        };
        this.successService.handleSuccess(this.dialogConfig);
      },
      (err) => {
        console.log('ERR: ', err);
        this.dialogConfig.data = { errorMessage: err.message };
        this.errorService.handleError(this.dialogConfig);
      }
    );
  }

  adjustEndDate(date: string) {
    const currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() + 1);
    return format(currentDate, 'yyyy-MM-dd');
  }
}
