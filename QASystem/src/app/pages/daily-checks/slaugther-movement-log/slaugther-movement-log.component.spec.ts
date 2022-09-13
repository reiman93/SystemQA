import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlaugtherMovementLogComponent } from './slaugther-movement-log.component';

describe('SlaugtherMovementLogComponent', () => {
  let component: SlaugtherMovementLogComponent;
  let fixture: ComponentFixture<SlaugtherMovementLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlaugtherMovementLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlaugtherMovementLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
