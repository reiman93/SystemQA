import { TestBed } from '@angular/core/testing';

import { HoldTagService } from './hold-tag.service';

describe('HoldTagService', () => {
  let service: HoldTagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HoldTagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
