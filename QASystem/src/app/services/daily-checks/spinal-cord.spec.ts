import { TestBed } from '@angular/core/testing';

import { SpinaCoordService } from './spinal-coord.service';

describe('SpinaCoordService', () => {
  let service: SpinaCoordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpinaCoordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
