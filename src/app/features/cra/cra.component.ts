import { Component } from '@angular/core';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventInput,
} from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Store } from '@ngrx/store';
import * as CalendarActions from './actions';
import { CalendarFeature, selectEventsCount } from './reducer';
import { createEventId } from './event-utils';

@Component({
  selector: 'app-cra',
  templateUrl: './cra.component.html',
  styleUrls: ['./cra.component.scss'],
})
export class CraComponent {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    // dateClick: this.handleDateClick.bind(this), // MUST ensure `this` context is maintained
    events: [
      { title: 'event 1', date: '2019-04-01' },
      { title: 'event 2', date: '2019-04-02' },
    ],
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
    select: this.handleDateSelect.bind(this),
    // eventClick: this.handleEventClick.bind(this),
  };

  toggleWeekends() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends; // toggle the boolean!
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    // const title = prompt('Please enter a new title for your event');
    // const calendarApi = selectInfo.view.calendar;
    // calendarApi.unselect(); // clear date selection
    // if (title) {
    //   const event: EventInput = {
    //     id: createEventId(),
    //     title,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     allDay: selectInfo.allDay,
    //   };
    //   // this.store.dispatch(CalendarActions.createEvent({ event }));
    // }
    console.log(selectInfo);
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // clear selected date

    // open modal
    // fill form
    // save form (api call)
    // close pop-up
  }
}
