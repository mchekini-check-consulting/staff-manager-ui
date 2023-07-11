import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor(private dialog: MatDialog) {}

  handleError(dialogConfig: any) {
    this.dialog.open(ErrorDialogComponent, dialogConfig);
  }
}
