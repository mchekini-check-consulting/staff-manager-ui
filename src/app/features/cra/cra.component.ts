import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarOptions, DateSelectArg } from '@fullcalendar/core';
import frLocale from '@fullcalendar/core/locales/fr';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import { ErrorHandlerService } from 'src/app/core/template/components/error-dialog/error-handler.service';
import { ModalComponent } from 'src/app/core/template/components/modal/modal.component';
import { SucessHandlerService } from 'src/app/core/template/components/success-dialog/success-dialog.service';
import { CraService } from '../../core/service/cra-service';
import { LocalStorageService } from 'src/app/core/service/storage-service';

@Component({
  selector: 'app-cra',
  templateUrl: './cra.component.html',
  styleUrls: ['./cra.component.scss'],
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
    {
      title: "Jour de l'An",
      date: '2023-01-01',
      display: 'background',
      color: 'green',
    },
    {
      title: 'Lundi de Pâques',
      date: '2023-04-10',
      display: 'background',
      color: 'green',
    },
    {
      title: 'Fête du travail',
      date: '2023-05-01',
      display: 'background',
      color: 'green',
    },
    {
      title: 'Armistice 1945',
      date: '2023-05-08',
      display: 'background',
      color: 'green',
    },
    {
      title: 'Ascension',
      date: '2023-05-18',
      display: 'background',
      color: 'green',
    },
    {
      title: 'Lundi de Pentecôte',
      date: '2023-05-29',
      display: 'background',
      color: 'green',
    },
    {
      title: 'Fête nationale',
      date: '2023-07-14',
      display: 'background',
      color: 'green',
    },
    {
      title: 'Assomption',
      date: '2023-08-15',
      display: 'background',
      color: 'green',
    },
    {
      title: 'Toussaint',
      date: '2023-11-01',
      display: 'background',
      color: 'green',
    },
    {
      title: 'Armistice 1918',
      date: '2023-11-11',
      display: 'background',
      color: 'green',
    },
    {
      title: 'Noël',
      date: '2023-12-25',
      display: 'background',
      color: 'green',
    },
  ];
  quantities: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
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

  constructor(
    public dialog: MatDialog,
    private craService: CraService,
    private errorService: ErrorHandlerService,
    private successService: SucessHandlerService,
    private storageService: LocalStorageService
  ) {}

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
      data: {
        date: selectInfo.start,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      // console.log('The dialog was closed: ', result);
      this.isFormValid = result;
      // this.events.push({ title: 'TT', date: selectInfo.start });
      // this.calendarOptions.events = this.events;
    });
  }

  // ********* FORM (handling) *********
  onSubmitCra(): void {
    if (this.isFormValid) return;
    const savedCra = this.storageService.onGetItem('saved-cra');
    // console.log(JSON.stringify(savedCra, null, 2));

    this.craService.createCra(savedCra).subscribe(
      (res) => {
        this.dialogConfig.data = {
          successMessage: "La soumission du CRA s'est déroulé avec succès ",
        };
        this.successService.handleSuccess(this.dialogConfig);
        this.storageService.onRemoveItem('saved-cra');

        // dialogRef.afterClosed().subscribe((result) => {});
      },
      (err) => {
        console.log('ERR: ', err);
        this.dialogConfig.data = { errorMessage: err.message };
        this.errorService.handleError(this.dialogConfig);
      }
    );
  }
}
