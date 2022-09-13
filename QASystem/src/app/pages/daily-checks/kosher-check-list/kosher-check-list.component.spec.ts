import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KosherCheckListComponent } from './kosher-check-list.component';

describe('KosherCheckListComponent', () => {
  let component: KosherCheckListComponent;
  let fixture: ComponentFixture<KosherCheckListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KosherCheckListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KosherCheckListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
