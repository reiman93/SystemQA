import { TestBed } from '@angular/core/testing';

import { JanitorService } from './janitor.service';

describe('JanitorService', () => {
  let service: JanitorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JanitorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
