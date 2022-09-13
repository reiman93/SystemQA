import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NozleGenericLogsComponent } from './nozle-generic-logs.component';

describe('NozleGenericLogsComponent', () => {
  let component: NozleGenericLogsComponent;
  let fixture: ComponentFixture<NozleGenericLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NozleGenericLogsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NozleGenericLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
