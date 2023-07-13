import { Component, Inject, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LocalStorage } from 'src/app/features/cra/cra.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
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
  dialogTitle: string = "Création d'un rebdu de compte";
  submitted = false;

  createForm() {
    return this.fb.group({
      quantity: ['', [Validators.required]],
      category: ['', [Validators.required]],
      comment: [''],
    });
  }

  createCraForm = this.fb.group({
    startingDate: ['', [Validators.required]],
    endingDate: ['', [Validators.required]],
    forms: this.fb.array([this.createForm()]),
  });

  get forms(): FormArray {
    return <FormArray>this.createCraForm.get('forms');
  }

  getFormsArr(index: number): FormGroup {
    const formsArr = this.createCraForm.get('forms') as FormArray;
    return formsArr.controls[index] as FormGroup;
  }

  hasError(controlName: string, errorName: string) {
    return this.createCraForm.get(controlName)?.hasError(errorName);
  }

  formsLength(): number {
    return this.createCraForm.controls.forms.length;
  }

  onAddForm() {
    if (this.createCraForm.controls.forms.length >= 2) return;
    this.forms.push(this.createForm());
  }
  onRemoveForm(index: number) {
    this.forms.removeAt(index);
  }
  onSaveCra(): void {
    if (this.createCraForm.invalid) return;
    console.log(JSON.stringify(this.createCraForm.value, null, 2));
    new LocalStorage().onSaveItem('save-cra', this.createCraForm.value);
  }
  onCancel(): void {
    this.dialogRef.close();
  }
}
