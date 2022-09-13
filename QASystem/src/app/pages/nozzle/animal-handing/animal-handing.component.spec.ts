import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalHandingComponent } from './animal-handing.component';

describe('AnimalHandingComponent', () => {
  let component: AnimalHandingComponent;
  let fixture: ComponentFixture<AnimalHandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimalHandingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalHandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
