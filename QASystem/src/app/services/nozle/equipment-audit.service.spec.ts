import { TestBed } from '@angular/core/testing';

import { EquipmentAuditService } from './equipment-audit.service';

describe('EquipmentAuditService', () => {
  let service: EquipmentAuditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EquipmentAuditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
