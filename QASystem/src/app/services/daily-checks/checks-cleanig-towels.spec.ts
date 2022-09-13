import { TestBed } from '@angular/core/testing';

import { ChecksCleanigTowelsService } from './checks-cleanig-towels.service';

describe('ChecksCleanigTowelsService', () => {
  let service: ChecksCleanigTowelsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChecksCleanigTowelsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
