import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JustificatifsComponent } from './justificatifs.component';

describe('JustificatifsComponent', () => {
  let component: JustificatifsComponent;
  let fixture: ComponentFixture<JustificatifsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JustificatifsComponent]
    });
    fixture = TestBed.createComponent(JustificatifsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
