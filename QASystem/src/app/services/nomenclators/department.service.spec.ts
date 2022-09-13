import { TestBed } from '@angular/core/testing';

import { DepartmentService } from './Department.service';

describe('DepartmentService', () => {
  let service: DepartmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepartmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
