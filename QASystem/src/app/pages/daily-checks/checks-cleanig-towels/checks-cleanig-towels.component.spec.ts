import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecksCleanigTowelsComponent } from './checks-cleanig-towels.component';

describe('ChecksCleanigTowelsComponent', () => {
  let component: ChecksCleanigTowelsComponent;
  let fixture: ComponentFixture<ChecksCleanigTowelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChecksCleanigTowelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecksCleanigTowelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
