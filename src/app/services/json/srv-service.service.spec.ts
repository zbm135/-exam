import { TestBed } from '@angular/core/testing';

import { SrvServiceService } from './srv-service.service';

describe('SrvServiceService', () => {
  let service: SrvServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SrvServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
