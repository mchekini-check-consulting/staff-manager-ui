import { Component, OnInit } from '@angular/core';
import { Observable, map, startWith } from 'rxjs';
import {
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { JustificatifService } from 'src/app/core/service/justificatif-service';
import Swal from 'sweetalert2';

interface IJustificatif {
  label: string;
  value: string;
}

const TYPE_JUSTIFICATIFS: IJustificatif[] = [
  {
    label: 'Transport',
    value: 'TRANSPORT',
  },
  {
    label: "Pièce d'identité",
    value: 'PIECE_IDENTITE',
  },
  {
    label: 'Carte vitale',
    value: 'CARTE_VITALE',
  },
  {
    label: 'Autre',
    value: 'AUTRE',
  },
];

@Component({
  selector: 'app-justificatifs',
  templateUrl: './justificatifs.component.html',
  styleUrls: ['./justificatifs.component.scss'],
})
export class JustificatifsComponent implements OnInit {
  options = TYPE_JUSTIFICATIFS;
  filteredOptions: Observable<IJustificatif[]> = new Observable();
  apiLoading = false;

  justificatifForm = new FormGroup({
    type: new FormControl<IJustificatif | null>(null, Validators.required),
    files: new FormControl<File[]>(
      [],
      this.requiredFilesValidator as ValidatorFn
    ),
  });

  typeControl = this.justificatifForm.get('type');
  filesControl = this.justificatifForm.get('files');

  constructor(private justificatifService: JustificatifService) {}

  ngOnInit(): void {
    this.filteredOptions =
      this.typeControl?.valueChanges.pipe(
        startWith(''),
        map((row) => this._filter(row))
      ) ?? new Observable();
  }

  private _filter(row: string | IJustificatif | null): IJustificatif[] {
    if (row && (row as string)?.toLowerCase) {
      const filterValue = (row as string).toLowerCase();

      return this.options.filter((option) =>
        option.label.toLowerCase().includes(filterValue)
      );
    } else {
      return this.options;
    }
  }

  requiredFilesValidator(control: FormControl) {
    const files: File[] = control.value;
    return files && files.length > 0 ? null : { required: true };
  }

  displayOptionLabel(option: IJustificatif): string {
    return option ? option.label : '';
  }

  onFormSubmit() {
    this.apiLoading = true;
    const values = this.justificatifForm.value;
    if (values.type && values.files) {
      this.justificatifService
        .createJustificatif({
          type: values.type?.value,
          file: values.files[0],
        })
        .subscribe(
          (res) => {
            this.apiLoading = false;

            Swal.fire({
              title: 'Succés',
              text: 'Vos justificatifs ont été soumis avec succés.',
              icon: 'success',
              confirmButtonText: 'OK',
            });
          },
          (err) => {
            this.apiLoading = false;
            Swal.fire({
              title: 'Erreur!',
              text: err.error.message,
              icon: 'error',
              confirmButtonText: 'OK',
            });
          }
        );
    }
  }
}
