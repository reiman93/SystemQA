import { TestBed } from '@angular/core/testing';

import { AnimalHandingService } from './animal-handing.service';

describe('AnimalHandingService', () => {
  let service: AnimalHandingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnimalHandingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
