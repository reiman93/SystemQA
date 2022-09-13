import { TestBed } from '@angular/core/testing';

import { KillFloorTempService } from './kill-floor-temp.service';

describe('KillFloorTempService', () => {
  let service: KillFloorTempService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KillFloorTempService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
