import { TestBed } from '@angular/core/testing';

import {  SampleRequestTypeService } from './sample-request-type.service';

describe('SampleRequestType', () => {
  let service: SampleRequestTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SampleRequestTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
