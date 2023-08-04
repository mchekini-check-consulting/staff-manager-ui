import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateCraModalComponent } from './create-cra-modal.component';

@Injectable({
  providedIn: 'root',
})
export class CreateCraHandlerService {
  constructor(private dialog: MatDialog) {}

  open(dialogConfig: any) {
    return this.dialog.open(CreateCraModalComponent, dialogConfig);
  }
}
