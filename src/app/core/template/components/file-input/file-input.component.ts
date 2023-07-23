import { Component, ElementRef, ViewChild, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss'],
})
export class FileInputComponent {
  currentFiles: File[] = [];
  showDrag = true;

  constructor() {}

  @ViewChild('fileInput') fileInput!: ElementRef;

  @Input() filesControl:
    | AbstractControl<File[] | null, File[] | null>
    | null
    | undefined;

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'copy';
      (event.target as HTMLElement).classList.add('drag-over');
    }
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    (event.target as HTMLElement).classList.remove('drag-over');
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    (event.target as HTMLElement).classList.remove('drag-over');

    if (event.dataTransfer) {
      const files = event.dataTransfer.files as never as File[];
      if (files.length > 0) {
        this.handleFiles(files);
      }
    }
  }

  onClick(event: Event) {
    this.fileInput.nativeElement.click();
  }

  onChange(event: Event) {
    const files = (event.target as HTMLInputElement).files as never as File[];
    if (files.length > 0) {
      this.handleFiles(files);
    }
  }

  handleFiles(files: File[]) {
    this.filesControl?.setValue(files);
    this.currentFiles = files;
    this.showDrag = files.length === 0;
  }
}
