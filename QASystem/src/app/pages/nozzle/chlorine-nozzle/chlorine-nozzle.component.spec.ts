import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChlorineNozzleComponent } from './chlorine-nozzle.component';

describe('ChlorineNozzleComponent', () => {
  let component: ChlorineNozzleComponent;
  let fixture: ComponentFixture<ChlorineNozzleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChlorineNozzleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChlorineNozzleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
