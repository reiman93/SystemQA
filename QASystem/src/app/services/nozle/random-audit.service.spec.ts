import { TestBed } from '@angular/core/testing';

import { RandomAuditService } from './random-audit.service';

describe('RandomAuditService', () => {
  let service: RandomAuditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandomAuditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
