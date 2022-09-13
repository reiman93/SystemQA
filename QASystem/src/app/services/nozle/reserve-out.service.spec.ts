import { TestBed } from '@angular/core/testing';

import { ReserveOutService } from './reserve-out.service';

describe('ReserveOutService', () => {
  let service: ReserveOutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReserveOutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
