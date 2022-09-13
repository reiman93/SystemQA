import { TestBed } from '@angular/core/testing';

import { SlaughterFloorGattleService } from './wr-slaughter-floor.service';

describe('SlaughterFloorGattleService', () => {
  let service: SlaughterFloorGattleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlaughterFloorGattleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
