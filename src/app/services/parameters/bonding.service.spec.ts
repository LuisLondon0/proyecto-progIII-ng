import { TestBed } from '@angular/core/testing';

import { BondingService } from './bonding.service';

describe('BondingService', () => {
  let service: BondingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BondingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
