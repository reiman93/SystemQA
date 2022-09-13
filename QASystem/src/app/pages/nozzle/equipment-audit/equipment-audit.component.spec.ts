import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentAuditComponent } from './equipment-audit.component';

describe('EquipmentAuditComponent', () => {
  let component: EquipmentAuditComponent;
  let fixture: ComponentFixture<EquipmentAuditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentAuditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
