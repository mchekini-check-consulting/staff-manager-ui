import {AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker, MatDatepickerModule} from '@angular/material/datepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {Moment} from 'moment';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FicheDePaieService } from 'src/app/core/service/fiche-de-paie.service';
import { FicheDePaie, FicheDePaiePostBody } from 'src/app/core/model/fiche-de-paie.model';
import { CommonModule } from '@angular/common';

const moment = _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-fiche-de-paie',
  templateUrl: './fiche-de-paie.component.html',
  styleUrls: ['./fiche-de-paie.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
  ],
})
export class FicheDePaieComponent implements AfterViewInit,OnInit {
  
  displayedColumns: string[] = ['fileName', 'timePeriod', 'actions'];
  dataSource = new MatTableDataSource<FicheDePaie>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private ficheDePaieService: FicheDePaieService) {}

  ngOnInit() {
    this.getFichesDePaie();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getFichesDePaie() {
    const body: FicheDePaiePostBody = {
      endDate: this.endDate.value?.toDate() || undefined, // Convert Moment to Date
      startDate: this.startDate.value?.toDate() || undefined, // Convert Moment to Date
    };
    this.ficheDePaieService.getFichesDePaie(body).subscribe((fichesDePaie) => {
      this.dataSource.data = fichesDePaie;
    });
  }

  startDate = new FormControl(moment());
  endDate = new FormControl(moment());

  setIntervalStart(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.startDate.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.startDate.setValue(ctrlValue);
    datepicker.close();
  }

  setIntervalEnd(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.endDate.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.endDate.setValue(ctrlValue);
    datepicker.close();
  }

}
