import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrSlaughterFloorComponent } from './wr-slaughter-floor.component';

describe('WrSlaughterFloorComponent', () => {
  let component: WrSlaughterFloorComponent;
  let fixture: ComponentFixture<WrSlaughterFloorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrSlaughterFloorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WrSlaughterFloorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
