import { TestBed } from '@angular/core/testing';

import { DefencyTypeService } from './defency-type.service';

describe('DefencyTypeService', () => {
  let service: DefencyTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefencyTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
