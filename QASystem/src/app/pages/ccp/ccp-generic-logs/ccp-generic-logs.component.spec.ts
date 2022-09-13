import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CcpGenericLogsComponent } from './ccp-generic-logs.component';

describe('CcpGenericLogsComponent', () => {
  let component: CcpGenericLogsComponent;
  let fixture: ComponentFixture<CcpGenericLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CcpGenericLogsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CcpGenericLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
