import { TestBed } from '@angular/core/testing';

import { NozzleInspectionService } from './nozzle-inspection.service';

describe('NozzleInspectionService', () => {
  let service: NozzleInspectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NozzleInspectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
