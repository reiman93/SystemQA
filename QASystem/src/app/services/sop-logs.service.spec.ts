import { TestBed } from '@angular/core/testing';

import { SopLogsService } from './sop-logs.service';

describe('SopLogsService', () => {
  let service: SopLogsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SopLogsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
