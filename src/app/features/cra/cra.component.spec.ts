import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CraComponent } from './cra.component';

describe('CraComponent', () => {
  let component: CraComponent;
  let fixture: ComponentFixture<CraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CraComponent]
    });
    fixture = TestBed.createComponent(CraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
