import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheDePaieComponent } from './fiche-de-paie.component';

describe('FicheDePaieComponent', () => {
  let component: FicheDePaieComponent;
  let fixture: ComponentFixture<FicheDePaieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FicheDePaieComponent]
    });
    fixture = TestBed.createComponent(FicheDePaieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
