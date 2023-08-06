import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileViewerDialogComponent } from './file-viewer-dialog.component';

describe('FileViewerDialogComponent', () => {
  let component: FileViewerDialogComponent;
  let fixture: ComponentFixture<FileViewerDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FileViewerDialogComponent]
    });
    fixture = TestBed.createComponent(FileViewerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
