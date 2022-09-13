import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SopGenircLogComponent } from './sop-genirc-log.component';

describe('SopGenircLogComponent', () => {
  let component: SopGenircLogComponent;
  let fixture: ComponentFixture<SopGenircLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SopGenircLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SopGenircLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
