import { TestBed } from '@angular/core/testing';

import { ChlorineNozzleService } from './chlorine-nozzle.service';

describe('ChlorineNozzleService', () => {
  let service: ChlorineNozzleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChlorineNozzleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
