import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestRoomsComponent } from './rest-rooms.component';

describe('RestRoomsComponent', () => {
  let component: RestRoomsComponent;
  let fixture: ComponentFixture<RestRoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestRoomsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
