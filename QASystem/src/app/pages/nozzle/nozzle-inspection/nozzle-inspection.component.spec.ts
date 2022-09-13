import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NozzleInspectionComponent } from './nozzle-inspection.component';

describe('NozzleInspectionComponent', () => {
  let component: NozzleInspectionComponent;
  let fixture: ComponentFixture<NozzleInspectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NozzleInspectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NozzleInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
