import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { format } from 'date-fns';

enum CategoryValue {
  JOUR_TRAVAILLE = 'JOUR_TRAVAILLE',
  CONGE_PAYE = 'CONGE_PAYE',
  CONGE_SANS_SOLDE = 'CONGE_SANS_SOLDE',
  CONGE_MATERNITE = 'CONGE_MATERNITE',
  CONGE_PATERNITE = 'CONGE_PATERNITE',
  ARRET_MALADIE = 'ARRET_MALADIE',
  RTT = 'RTT',
  INTERCONTRAT = 'INTERCONTRAT',
  ASTREINTE = 'ASTREINTE',
  HEURE_SUPPLEMENTAIRE = 'HEURE_SUPPLEMENTAIRE',
  RACHAT_RTT = 'RACHAT_RTT',
}

interface ICategory {
  value: CategoryValue; // Use the enum type for the 'value' property
  label: string;
}

@Component({
  selector: 'app-create-cra-modal',
  templateUrl: './create-cra-modal.component.html',
  styleUrls: ['./create-cra-modal.component.scss'],
})
export class CreateCraModalComponent implements OnInit {
  categories: ICategory[] = [
    { value: CategoryValue.JOUR_TRAVAILLE, label: 'JOUR TRAVAILLE' },
    { value: CategoryValue.CONGE_PAYE, label: 'CONGE PAYE' },
    { value: CategoryValue.CONGE_SANS_SOLDE, label: 'CONGE SANS SOLDE' },
    { value: CategoryValue.CONGE_MATERNITE, label: 'CONGE MATERNITE' },
    { value: CategoryValue.CONGE_PATERNITE, label: 'CONGE PATERNITE' },
    { value: CategoryValue.ARRET_MALADIE, label: 'ARRET MALADIE' },
    { value: CategoryValue.RTT, label: 'RTT' },
    { value: CategoryValue.INTERCONTRAT, label: 'INTERCONTRAT' },
    { value: CategoryValue.ASTREINTE, label: 'ASTREINTE' },
    {
      value: CategoryValue.HEURE_SUPPLEMENTAIRE,
      label: 'HEURE SUPPLEMENTAIRE',
    },
    { value: CategoryValue.RACHAT_RTT, label: 'RACHAT RTT' },
  ];

  quantities: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
  dialogTitle: string = "Création d'un compte rendu d'activité";

  constructor(
    public dialogRef: MatDialogRef<CreateCraModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dateAdapter: DateAdapter<any>
  ) {}

  ngOnInit() {
    this.dateAdapter.setLocale('fr-FR');
  }

  createForm() {
    return this.fb.group({
      quantity: ['', [Validators.required]],
      category: ['', [Validators.required]],
      comment: [''],
    });
  }

  createCraForm = this.fb.group({
    startDate: [this.data.date, [Validators.required]],
    endDate: [this.data.date, [Validators.required]],
    activities: this.fb.array([this.createForm()]),
  });

  get activities(): FormArray {
    return <FormArray>this.createCraForm.get('activities');
  }

  getActivitiesArr(index: number): FormGroup {
    const formsArr = this.createCraForm.get('activities') as FormArray;
    return formsArr.controls[index] as FormGroup;
  }

  activitiesLength(): number {
    return this.createCraForm.controls.activities.length;
  }

  onAddActivity() {
    if (this.createCraForm.controls.activities.length >= 4) return;
    this.activities.push(this.createForm());
  }
  onRemoveActivity(index: number) {
    this.activities.removeAt(index);
  }

  hasError(controlName: string, errorName: string) {
    return this.createCraForm.get(controlName)?.hasError(errorName);
  }

  onSaveCra(): void {
    if (this.createCraForm.invalid) return;

    this.dialogRef.close(
      (this.data = {
        craObj: this.createCraForm.value,
        isFormValid: !this.createCraForm.invalid,
      })
    );
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
