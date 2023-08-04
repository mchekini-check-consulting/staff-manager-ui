import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from './info-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class InfoHandlerService {
  constructor(private dialog: MatDialog) {}

  handleInfo(dialogConfig: any) {
    return this.dialog.open(InfoDialogComponent, dialogConfig);
  }
}
