import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class SucessHandlerService {
  constructor(private dialog: MatDialog) {}

  handleSuccess(dialogConfig: any, message?: any) {
    this.dialog.open(SuccessDialogComponent, dialogConfig);
  }
}
