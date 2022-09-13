import { TestBed } from '@angular/core/testing';

import { TurnTypeService } from './turn-type.service';

describe('JanitorService', () => {
  let service: TurnTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TurnTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
