import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarOptions, DateSelectArg } from '@fullcalendar/core';
import frLocale from '@fullcalendar/core/locales/fr';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import { format } from 'date-fns';
import { IActivity } from 'src/app/core/model/cra-model';
import { HolidayService } from 'src/app/core/service/holiday-service';
import { CreateCraHandlerService } from 'src/app/core/template/components/create-cra-modal/create-cra.service';
import { ErrorHandlerService } from 'src/app/core/template/components/error-dialog/error-handler.service';
import { InfoHandlerService } from 'src/app/core/template/components/info-dialog/info-handler.service';
import { SucessHandlerService } from 'src/app/core/template/components/success-dialog/success-dialog.service';
import { CraService } from '../../core/service/cra-service';

type EventType = {
  title: string;
  display?: string;
  color?: string;
  date: string;
  textColor?: string;
};

type CraObjType = {
  startDate: Date;
  endDate: Date;
  activities: {
    category: string;
    quantity: number;
    comment?: string;
  }[];
};

@Component({
  selector: 'app-cra',
  templateUrl: './cra.component.html',
  styleUrls: ['./cra.component.scss'],
})
export class CraComponent implements OnInit {
  HOLIDAYS_EVENTS: EventType[] = [];
  title: string = "Création d'un compte rendu d'activité";
  dialogConfig: any = {
    height: '250px',
    width: '350px',
    disableClose: true,
    data: {},
  };
  isFormValid: boolean = false;
  events: EventType[] = [];
  craToSubmit: IActivity[] = [];

  constructor(
    public dialog: MatDialog,
    private craService: CraService,
    private errorService: ErrorHandlerService,
    private successService: SucessHandlerService,
    private holidaysService: HolidayService,
    private infoService: InfoHandlerService,
    private createCraService: CreateCraHandlerService
  ) {}

  ngOnInit() {
    this.holidaysService.getPublicHolidays().subscribe((res) => {
      this.HOLIDAYS_EVENTS = res.map((d) => {
        return {
          title: 'holiday',
          date: d.date,
          display: 'background',
          color: 'gray',
        };
      });

      const weekends = this.holidaysService.getWeekEnds();
      const eventList = [...this.HOLIDAYS_EVENTS, ...weekends];

      // set all events
      this.events = [...eventList];
      this.calendarOptions.events = [...eventList];
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
    select: this.onSelectDate.bind(this),
    height: '650px',
  };

  onSelectDate(selectedDate: DateSelectArg) {
    const dialogConfigModal = {
      height: '650px',
      width: '600px',
      disableClose: true,
      data: {
        date: selectedDate.start,
      },
    };

    const isRestDay = this.events
      .filter((ev) => ev.title === 'week-end' || ev.title === 'holiday')
      .map((d) => d.date)
      .includes(selectedDate.startStr);

    if (isRestDay) {
      this.dialogConfig.data = {
        infoMessage:
          'Attention vous venez de séléctionner un jour férier ou un weeke-end',
      };
      const dialogInfo = this.infoService.handleInfo(this.dialogConfig);

      dialogInfo.afterClosed().subscribe((res) => {
        const dialogRefModalForm =
          this.createCraService.open(dialogConfigModal);

        dialogRefModalForm.afterClosed().subscribe((res) => {
          this.isFormValid = res.isFormValid;
          this.onHandle(res.craObj);
        });
      });

      return;
    }
    const dialogRefModalForm = this.createCraService.open(dialogConfigModal);

    dialogRefModalForm.afterClosed().subscribe((res) => {
      this.isFormValid = res.isFormValid;
      this.onHandle(res.craObj);
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

  adjustEndDate(date: Date): Date {
    const currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() + 1);
    return currentDate;
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
  areDatesConsecutive(dates: string[]): boolean {
    const dateObjects: Date[] = dates.map((d) => new Date(d));

    for (let i = 1; i < dateObjects.length; i++) {
      const diffInDays =
        (dateObjects[i].getTime() - dateObjects[i - 1].getTime()) /
        (1000 * 60 * 60 * 24);
      if (diffInDays !== 1) return false;
    }

    return true;
  }

  onHandle(craObj: CraObjType) {
    const dates = this.getDatesArray(craObj.startDate, craObj.endDate).map(
      (d) => format(d, 'yyyy-MM-dd')
    );

    let list1: string[] = [];
    let list2: string[] = [];

    const restDays = this.events.filter(
      (ev) => ev.title === 'week-end' || ev.title === 'holiday'
    );

    const workDays = this.events.filter(
      (ev) => ev.title !== 'week-end' && ev.title !== 'holiday'
    );

    for (let i = 0; i < dates.length; i++) {
      const currentDate = dates[i];

      if (restDays.map((d) => d.date).includes(currentDate)) {
        list1.push(currentDate);
      }

      if (workDays.map((d) => d.date).includes(currentDate)) {
        list2.push(currentDate);
      }

      if (
        !workDays.map((d) => d.date).includes(currentDate) &&
        !restDays.map((d) => d.date).includes(currentDate)
      ) {
        list2.push(currentDate);
      }
    }

    if (list2.length > 0) {
      // les jours de travail hors weekEnds / holidays selected
      this.addEvent(craObj, list2);
      this.generateActivities(craObj, list2);
      return;
    }
    if (list1.length > 0 && this.areDatesConsecutive(list1)) {
      // les weekEnds / holidays only selected
      this.addEvent(craObj, list1);
      this.generateActivities(craObj, list1);
      return;
    } else return;
  }
  generateActivities(craObj: CraObjType, dates: string[]) {
    let activities: IActivity[] = [];
    for (let j = 0; j < dates.length; j++) {
      for (let i = 0; i < craObj.activities.length; i++) {
        activities.push({
          date: dates[j],
          quantity: craObj.activities[i].quantity,
          category: craObj.activities[i].category,
          comment: craObj.activities[i].comment,
        });
      }
    }

    this.craToSubmit.push(...activities);
  }
  addEvent(craObj: CraObjType, dates: string[]) {
    const activities = craObj.activities;
    let newEventsToAdd: EventType[] = [];

    for (let i = 0; i < activities.length; i++) {
      const title = `${activities[i].quantity}h ${activities[
        i
      ].category.replaceAll('_', ' ')}`;

      newEventsToAdd.push(
        ...dates.map((el) => {
          return {
            title: title,
            date: el,
            color: 'blue',
            textColor: 'white',
          };
        })
      );
    }

    if (newEventsToAdd.length === 0) return;

    this.calendarOptions.events = [...this.events, ...newEventsToAdd];
    this.events.push(...newEventsToAdd);
  }
}
