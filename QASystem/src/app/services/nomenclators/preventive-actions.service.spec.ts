import { TestBed } from '@angular/core/testing';

import { PreventiveActionsService } from './preventive-actions.service';

describe('PreventiveActionsService', () => {
  let service: PreventiveActionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreventiveActionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
