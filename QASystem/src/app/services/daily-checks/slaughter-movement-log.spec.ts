import { TestBed } from '@angular/core/testing';

import { SlaughterMovementLogService } from './slaughter-movement-log.service';

describe('SlaughterFloorGattleService', () => {
  let service: SlaughterMovementLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlaughterMovementLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
