import { TestBed } from '@angular/core/testing';

import { VisualSpinalCordService } from './visual-spinal-cord.service';

describe('VisualSpinalCordService', () => {
  let service: VisualSpinalCordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisualSpinalCordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
