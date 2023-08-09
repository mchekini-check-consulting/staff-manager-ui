import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-file-viewer-dialog',
  templateUrl: './file-viewer-dialog.component.html',
  styleUrls: ['./file-viewer-dialog.component.scss'],
})
export class FileViewerDialogComponent {
  pdfUrl: any;

  constructor(
    public dialogRef: MatDialogRef<FileViewerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { fileName: string; pdfUrl: string },
    private sanitizer: DomSanitizer
  ) {
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(data.pdfUrl);
  }
}
