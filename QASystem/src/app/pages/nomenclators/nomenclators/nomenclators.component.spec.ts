import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NomenclatorsComponent } from './nomenclators.component';

describe('NomenclatorsComponent', () => {
  let component: NomenclatorsComponent;
  let fixture: ComponentFixture<NomenclatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NomenclatorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NomenclatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
