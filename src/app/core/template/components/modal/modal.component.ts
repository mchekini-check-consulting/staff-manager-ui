import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { format } from 'date-fns';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dateAdapter: DateAdapter<any>
  ) {}

  ngOnInit() {
    this.dateAdapter.setLocale('fr-FR');
  }

  categories: any[] = [
    { value: 'JOUR_TRAVAILLE', label: 'JOUR TRAVAILLE' },
    { value: 'CONGE_PAYE', label: 'CONGE PAYE' },
    { value: 'CONGE_SANS_SOLDE', label: 'CONGE SANS SOLDE' },
    { value: 'CONGE_MATERNITE', label: 'CONGE MATERNITE' },
    { value: 'CONGE_PATERNITE', label: 'CONGE PATERNITE' },
    { value: 'ARRET_MALADIE', label: 'ARRET MALADIE' },
    { value: 'RTT', label: 'RTT' },
    { value: 'INTERCONTRAT', label: 'INTERCONTRAT' },
    { value: 'ASTREINTE', label: 'ASTREINTE' },
    { value: 'HEURE_SUPPLEMENTAIRE', label: 'HEURE SUPPLEMENTAIRE' },
    { value: 'RACHAT_RTT', label: 'RACHAT RTT' },
  ];

  quantities: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
  dialogTitle: string = "Création d'un rendu d'activité";

  createForm() {
    return this.fb.group({
      quantity: ['', [Validators.required]],
      category: ['', [Validators.required]],
      comment: [''],
    });
  }

  createCraForm = this.fb.group({
    startDate: ['', [Validators.required]],
    endDate: ['', [Validators.required]],
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

    const craObj = {
      startDate: format(
        new Date(this.createCraForm.value.startDate as string),
        'yyyy-MM-dd'
      ),
      endDate: format(
        new Date(this.createCraForm.value.endDate as string),
        'yyyy-MM-dd'
      ),
      activities: this.createCraForm.value.activities,
    };

    // this.storageService.onSaveItem('save-cra', { activities });
    this.dialogRef.close(
      (this.data = {
        craObj,
        isFormValid: !this.createCraForm.invalid,
      })
    );
  }
  onCancel(): void {
    this.dialogRef.close();
  }
}
