import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { format } from 'date-fns';
import { LocalStorage } from 'src/app/features/cra/cra.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {}

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
  dialogTitle: string = "Création d'un rendu d'activité";

  createForm() {
    return this.fb.group({
      // date: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      category: ['', [Validators.required]],
      comment: [''],
    });
  }

  createCraForm = this.fb.group({
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
    if (this.createCraForm.controls.activities.length >= 2) return;
    this.activities.push(this.createForm());
  }
  onRemoveActivity(index: number) {
    this.activities.removeAt(index);
  }

  hasError(controlName: string, errorName: string) {
    return this.createCraForm.get(controlName)?.hasError(errorName);
  }

  onSaveCra(): void {
    console.log(this.createCraForm.invalid);
    if (this.createCraForm.invalid) return;

    const activities = this.createCraForm.value.activities?.map((act) => {
      return { ...act, date: format(this.data.date, 'dd-MM-yyyy') };
    });

    console.log(activities);

    new LocalStorage().onSaveItem('save-cra', this.createCraForm.value);
  }
  onCancel(): void {
    this.dialogRef.close();
  }
}
