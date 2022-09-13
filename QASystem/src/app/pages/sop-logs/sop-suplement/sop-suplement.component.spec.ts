import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SopSuplementComponent } from './sop-suplement.component';

describe('SopSuplementComponent', () => {
  let component: SopSuplementComponent;
  let fixture: ComponentFixture<SopSuplementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SopSuplementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SopSuplementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
