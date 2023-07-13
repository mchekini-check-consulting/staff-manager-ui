import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CalendarOptions, DateSelectArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import { ErrorHandlerService } from 'src/app/core/template/components/error-dialog/error-handler.service';
import { ModalComponent } from 'src/app/core/template/components/modal/modal.component';
import { SuccessDialogComponent } from 'src/app/core/template/components/success-dialog/success-dialog.component';
import { CraService } from '../../core/service/cra-service';
import frLocale from '@fullcalendar/core/locales/fr';
import { isWeekend } from 'date-fns';

export class LocalStorage {
  onSaveItem(key: string, item: any) {
    try {
      localStorage.setItem(key, JSON.stringify(item));
    } catch (err) {
      console.log('Err: ', err);
    }
  }
  onGetItem(key: string) {
    try {
      const value = localStorage.getItem(key);
      if (value != '' && value != null && typeof value != 'undefined') {
        return JSON.parse(value!);
      }
    } catch (err) {
      console.log('ERR: ', err);
    }
  }
  onRemoveItem(key: string) {
    try {
      localStorage.removeItem(key);
    } catch (err) {
      console.log('Err: ', err);
    }
  }
}

@Component({
  selector: 'app-cra',
  templateUrl: './cra.component.html',
})
export class CraComponent {
  categories: string[] = [
    "Jour de l'An",
    'Lundi de Pâques',
    'Fête du travail',
    'Armistice 1945',
    'Ascension',
    'Lundi de Pentecôte',
    'Fête nationale',
    'Assomption',
    'Toussaint',
    'Armistice 1918',
    'Noël',
  ];
  HOLIDAYS = [
    { title: "Jour de l'An", date: '2023-01-01' },
    { title: 'Lundi de Pâques', date: '2023-04-10' },
    { title: 'Fête du travail', date: '2023-05-01' },
    { title: 'Armistice 1945', date: '2023-05-08' },
    { title: 'Ascension', date: '2023-05-18' },
    { title: 'Lundi de Pentecôte', date: '2023-05-29' },
    {
      title: 'Fête nationale',
      date: '2023-07-14',
    },
    { title: 'Assomption', date: '2023-08-15' },
    { title: 'Toussaint', date: '2023-11-01' },
    { title: 'Armistice 1918', date: '2023-11-11' },
    { title: 'Noël', date: '2023-12-25' },
  ];
  quantities: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
  title: string = "Création d'un rebdu de compte";
  submitted = false;

  dialogConfig: any = {
    height: '200px',
    width: '400px',
    disableClose: true,
    data: {},
  };
  errorMessage: string = '';

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private craService: CraService,
    private errorService: ErrorHandlerService // private storage: LocalStorage
  ) {}

  ngOnInit() {}

  calendarOptions: CalendarOptions = {
    locales: [frLocale],
    locale: 'fr',
    initialView: 'dayGridMonth',

    // dateClick: this.handleDateClick.bind(this), // MUST ensure `this` context is maintained
    events: [],
    initialEvents: [...this.HOLIDAYS],
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    // eventBackgroundColor: 'green',
    eventDisplay: 'background',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleSeclectedDay.bind(this),
  };

  openModal(): void {
    this.dialog.open(ModalComponent);
  }

  toggleWeekends() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends; // toggle the boolean!
  }

  handleSeclectedDay(selectInfo: DateSelectArg) {
    const selectedDay = selectInfo.start;

    // console.log(selectedDay, isWeekend(selectedDay));
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // clear selected date

    this.openModal();
  }

  // ********* FORM (handling) *********
  onSubmitCra(): void {
    this.submitted = true;

    const savedCra = new LocalStorage().onGetItem('saved-cra');
    if (!savedCra) return;
    console.log(JSON.stringify(savedCra, null, 2));

    this.craService.createCra(savedCra).subscribe(
      (res) => {
        let dialogRef = this.dialog.open(
          SuccessDialogComponent,
          this.dialogConfig
        );
        // dialogRef.afterClosed().subscribe((result) => {});
      },
      (err) => {
        console.log('ERR: ', err);
        this.dialogConfig.data = { errorMessage: err.message };
        this.errorService.handleError("L'erreur !", this.dialogConfig);
      }
    );
  }
}
