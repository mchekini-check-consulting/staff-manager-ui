import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarOptions, DateSelectArg } from '@fullcalendar/core';
import frLocale from '@fullcalendar/core/locales/fr';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import { format, isWeekend } from 'date-fns';
import { ErrorHandlerService } from 'src/app/core/template/components/error-dialog/error-handler.service';
import { ModalComponent } from 'src/app/core/template/components/modal/modal.component';
import { SucessHandlerService } from 'src/app/core/template/components/success-dialog/success-dialog.service';
import { CraService } from '../../core/service/cra-service';
import { CraModel } from 'src/app/core/model/cra-model';

@Component({
  selector: 'app-cra',
  templateUrl: './cra.component.html',
  styleUrls: ['./cra.component.scss'],
})
export class CraComponent implements OnInit {
  currentYear = new Date().getFullYear();
  HOLIDAYS = [
    {
      title: "Jour de l'An",
      date: this.currentYear + '-01-01',
      display: 'background',
      color: 'gray',
      textColor: 'black',
    },
    {
      title: 'Lundi de Pâques',
      date: this.currentYear + '-04-10',
      display: 'background',
      color: 'gray',
      textColor: 'black',
    },
    {
      title: 'Fête du travail',
      date: this.currentYear + '-05-01',
      display: 'background',
      color: 'gray',
      textColor: 'black',
    },
    {
      title: 'Armistice 1945',
      date: this.currentYear + '-05-08',
      display: 'background',
      color: 'gray',
      textColor: 'black',
    },
    {
      title: 'Ascension',
      date: this.currentYear + '-05-18',
      display: 'background',
      color: 'gray',
      textColor: 'black',
    },
    {
      title: 'Lundi de Pentecôte',
      date: this.currentYear + '-05-29',
      display: 'background',
      color: 'gray',
      textColor: 'black',
    },
    {
      title: 'Fête nationale',
      date: this.currentYear + '-07-14',
      display: 'background',
      color: 'gray',
      textColor: 'white',
    },
    {
      title: 'Assomption',
      date: this.currentYear + '-08-15',
      display: 'background',
      color: 'gray',
      textColor: 'black',
    },
    {
      title: 'Toussaint',
      date: this.currentYear + '-11-01',
      display: 'background',
      color: 'gray',
      textColor: 'black',
    },
    {
      title: 'Armistice 1918',
      date: this.currentYear + '-11-11',
      display: 'background',
      color: 'gray',
      textColor: 'black',
    },
    {
      title: 'Noël',
      date: this.currentYear + '-12-25',
      display: 'background',
      color: 'gray',
      textColor: 'black',
    },
  ];
  HOLIDAYS_DATES = [
    this.currentYear + '-01-01',
    this.currentYear + '-04-10',
    this.currentYear + '-05-01',
    this.currentYear + '-05-08',
    this.currentYear + '-05-18',
    this.currentYear + '-05-29',
    this.currentYear + '-07-14',
    this.currentYear + '-08-15',
    this.currentYear + '-11-01',
    this.currentYear + '-11-11',
    this.currentYear + '-12-25',
  ];
  title: string = "Création d'un rendu de compte";
  submitted = false;
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
    private successService: SucessHandlerService
  ) {}

  ngOnInit() {
    const daysMonth = (month: number, year: number) =>
      Array.from(
        { length: new Date(year, month, 0).getDate() },
        (_, i) => new Date(year, month - 1, i + 1)
      );
    const daysYear = () => {
      return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((m) =>
        daysMonth(m, new Date().getFullYear())
      );
    };

    const weekEnds = () => {
      return daysYear()
        .map((m) => m.filter((d: any) => isWeekend(d)))
        .flat(2);
    };

    const createEvents = (arr: any, isWorkDays?: boolean) => {
      return arr.map((d: any) => {
        return {
          title: '',
          date: format(new Date(d), 'yyyy-MM-dd'),
          display: 'background',
          color: isWorkDays ? 'blue' : 'gray',
          textColor: 'black',
        };
      });
    };

    this.events.push(...createEvents(weekEnds()));
    this.calendarOptions.events = this.events;
  }

  calendarOptions: CalendarOptions = {
    locales: [frLocale],
    locale: 'fr',
    initialView: 'dayGridMonth',
    events: [],
    initialEvents: [...this.HOLIDAYS],
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

  toggleWeekends() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends; // toggle the boolean!
  }

  handleSeclectedDay(selectInfo: DateSelectArg) {
    const dialogRef = this.dialog.open(ModalComponent, {
      height: '600px',
      width: '600px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      // console.log('The dialog was closed: ', result);

      this.isFormValid = result.isFormValid;
      this.craObj = result.craObj;

      const craTitle = result.craObj.activities
        .map((act: any) => act.category.split('_').join(' '))
        .join(' / ');

      if (result.craObj.startDate !== result.craObj.endDate) {
        const newCra = {
          title: craTitle,
          start: result.craObj.startDate,
          end: this.adjustEndDate(result.craObj.endDate),
          color: 'blue',
          textColor: 'white',
        };
        this.calendarOptions.events = [...this.events, newCra];
        this.events.push(newCra);
      } else {
        const newCra = {
          title: craTitle,
          date: result.craObj.startDate,
          color: 'blue',
          textColor: 'white',
        };
        this.calendarOptions.events = [...this.events, newCra];
        this.events.push(newCra);
      }
    });
  }

  // ********* FORM (handling) *********
  onSubmitCra(): void {
    if (!this.isFormValid) return;

    const craToSubmit = {
      activities: this.craObj.activities.map((act: any, idx: number) => {
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

    console.log(craToSubmit);

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

    //  this.craService.createCra(this.craObj).subscribe(
    //    (res) => {
    //      this.dialogConfig.data = {
    //        successMessage: "La soumission du CRA s'est déroulé avec succès ",
    //      };
    //      this.successService.handleSuccess(this.dialogConfig);

    //    },
    //    (err) => {
    //      console.log('ERR: ', err);
    //      this.dialogConfig.data = { errorMessage: err.message };
    //      this.errorService.handleError(this.dialogConfig);
    //    }
    //  );
  }

  adjustEndDate(date: string) {
    const currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() + 1);
    return format(currentDate, 'yyyy-MM-dd');
  }
}
