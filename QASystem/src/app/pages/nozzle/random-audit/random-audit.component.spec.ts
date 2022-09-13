import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomAuditComponent } from './random-audit.component';

describe('RandomAuditComponent', () => {
  let component: RandomAuditComponent;
  let fixture: ComponentFixture<RandomAuditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RandomAuditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
