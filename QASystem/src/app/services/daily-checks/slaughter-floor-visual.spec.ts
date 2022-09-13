import { TestBed } from '@angular/core/testing';

import { SlaughterFloorVisualService } from './slaughter-floor-visual.service';

describe('SlaughterFloorGattleService', () => {
  let service: SlaughterFloorVisualService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlaughterFloorVisualService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
