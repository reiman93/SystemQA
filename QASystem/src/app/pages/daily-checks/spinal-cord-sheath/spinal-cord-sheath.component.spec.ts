import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinalCordSheathComponent } from './spinal-cord-sheath.component';

describe('SpinalCordSheathComponent', () => {
  let component: SpinalCordSheathComponent;
  let fixture: ComponentFixture<SpinalCordSheathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpinalCordSheathComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinalCordSheathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
