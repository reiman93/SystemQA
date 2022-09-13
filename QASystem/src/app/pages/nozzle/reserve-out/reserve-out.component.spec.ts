import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveOutComponent } from './reserve-out.component';

describe('ReserveOutComponent', () => {
  let component: ReserveOutComponent;
  let fixture: ComponentFixture<ReserveOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReserveOutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserveOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
