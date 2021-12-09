import { TestBed } from '@angular/core/testing';

import { typeVinculationService } from './type-vinculation.service';

describe('typeVinculationService', () => {
  let service: typeVinculationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(typeVinculationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
