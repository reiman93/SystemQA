import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrKillFloorComponent } from './wr-kill-floor.component';

describe('WrKillFloorComponent', () => {
  let component: WrKillFloorComponent;
  let fixture: ComponentFixture<WrKillFloorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrKillFloorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WrKillFloorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
