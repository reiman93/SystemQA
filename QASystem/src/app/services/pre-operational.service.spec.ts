import { TestBed } from '@angular/core/testing';

import { PreOperationalService } from './pre-operational.service';

describe('PreOperationalService', () => {
  let service: PreOperationalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreOperationalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
