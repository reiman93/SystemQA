import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrSpinalCordComponent } from './wr-spinal-cord.component';

describe('WrSpinalCordComponent', () => {
  let component: WrSpinalCordComponent;
  let fixture: ComponentFixture<WrSpinalCordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrSpinalCordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WrSpinalCordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
