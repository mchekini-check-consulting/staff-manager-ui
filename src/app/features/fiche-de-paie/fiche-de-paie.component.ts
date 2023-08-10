import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import {
  MatDatepicker,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { Moment } from 'moment';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FicheDePaieService } from 'src/app/core/service/fiche-de-paie.service';
import {
  FicheDePaie,
  FicheDePaiePostBody,
} from 'src/app/core/model/fiche-de-paie.model';
import { CommonModule } from '@angular/common';
import { format, isValid } from 'date-fns';
import Swal from 'sweetalert2';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FileViewerDialogComponent } from 'src/app/core/template/components/file-viewer-dialog/file-viewer-dialog.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

const moment = _moment;

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
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
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
    MatDialogModule,
  ],
})
export class FicheDePaieComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['fileName', 'timePeriod', 'actions'];
  dataSource = new MatTableDataSource<FicheDePaie>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private ficheDePaieService: FicheDePaieService,
    private dialog: MatDialog,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.getFichesDePaie();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getFichesDePaie() {
    const endDate = isValid(this.endDate.value?.toDate())
      ? format(this.endDate.value?.toDate()!, 'MM/yyyy')
      : null;

    const startDate = isValid(this.startDate.value?.toDate())
      ? format(this.startDate.value?.toDate()!, 'MM/yyyy')
      : null;

    const body: FicheDePaiePostBody = {
      endDate: endDate,
      startDate: startDate,
    };

    this.ficheDePaieService.getFichesDePaie(body).subscribe(
      (res) => {
        this.dataSource.data = res;
      },
      (err) => {
        let errorText = err?.error?.message + '\n';

        if (err.validations) {
          for (const key in err.validations) {
            errorText += key + ' : ' + err.validations[key] + '\n';
          }
        }

        Swal.fire({
          title: 'Erreur!',
          text: errorText,
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    );
  }

  startDate = new FormControl();
  endDate = new FormControl();

  setIntervalStart(
    normalizedMonthAndYear: Moment,
    datepicker: MatDatepicker<Moment>
  ) {
    if (this.startDate.value == null) {
      this.startDate = new FormControl(moment());
    }
    const newValue = this.startDate.value!;
    newValue.month(normalizedMonthAndYear.month());
    newValue.year(normalizedMonthAndYear.year());
    this.startDate.setValue(newValue);
    datepicker.close();
  }

  setIntervalEnd(
    normalizedMonthAndYear: Moment,
    datepicker: MatDatepicker<Moment>
  ) {
    if (this.endDate.value == null) {
      this.endDate = new FormControl(moment());
    }
    const newValue = this.endDate.value!;
    newValue.month(normalizedMonthAndYear.month());
    newValue.year(normalizedMonthAndYear.year());
    this.endDate.setValue(newValue);
    datepicker.close();
  }

  startDateIsValid(): Boolean {
    if (
      isValid(this.endDate.value?.toDate()) &&
      isValid(this.startDate.value?.toDate())
    ) {
      return this.startDate.value.isBefore(this.endDate.value);
    }
    return true;
  }

  endDateIsValid(): Boolean {
    if (
      isValid(this.endDate.value?.toDate()) &&
      isValid(this.startDate.value?.toDate())
    ) {
      return this.endDate.value.isAfter(this.startDate.value);
    }
    return true;
  }

  handleDownload(name: string) {
    this.downloadPDF(name);
  }

  downloadPDF(fileName: string) {
    this.ficheDePaieService
      .downloadFicheDePaie(fileName)
      .subscribe((data: ArrayBuffer) => {
        const blob = new Blob([data], { type: 'application/pdf' });
        const pdfUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.target = '_blank';
        link.download = fileName;
        link.click();
        window.URL.revokeObjectURL(pdfUrl);
      });
  }

  displayFile(fileName: string) {
    this.ficheDePaieService
      .downloadFicheDePaie(fileName)
      .subscribe((data: ArrayBuffer) => {
        const blob = new Blob([data], { type: 'application/pdf' });
        const pdfUrl = window.URL.createObjectURL(blob);

        const safePdfUrl: SafeResourceUrl =
          this.sanitizer.bypassSecurityTrustResourceUrl(pdfUrl);

        const dialogRef = this.dialog.open(FileViewerDialogComponent, {
          width: '80%',
          height: '80%',
          data: { fileName, pdfUrl }, // Pass the PDF URL to the dialog
        });

        dialogRef.afterClosed().subscribe(() => {});
      });
  }
}
