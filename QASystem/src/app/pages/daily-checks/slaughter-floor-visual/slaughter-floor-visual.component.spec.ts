import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlaughterFloorVisualComponent } from './slaughter-floor-visual.component';

describe('SlaughterFloorVisualComponent', () => {
  let component: SlaughterFloorVisualComponent;
  let fixture: ComponentFixture<SlaughterFloorVisualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlaughterFloorVisualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlaughterFloorVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
