import { TestBed } from '@angular/core/testing';

import { SampleFormsService } from './sample-forms.service';

describe('SampleForms', () => {
  let service: SampleFormsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SampleFormsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
