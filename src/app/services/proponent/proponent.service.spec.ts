import { TestBed } from '@angular/core/testing';

import { proponentService } from './proponent.service';

describe('proponentService', () => {
  let service: proponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(proponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
