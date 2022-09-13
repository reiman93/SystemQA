import { TestBed } from '@angular/core/testing';

import { KosherService } from './kosher.service';

describe('KosherService', () => {
  let service: KosherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KosherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
