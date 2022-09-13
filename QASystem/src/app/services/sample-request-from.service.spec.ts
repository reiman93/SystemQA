import { TestBed } from '@angular/core/testing';

import { SampleRequestFormService } from './sample-request-from.service';

describe('SampleRequestFormService', () => {
  let service: SampleRequestFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SampleRequestFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
