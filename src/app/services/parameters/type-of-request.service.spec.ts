import { TestBed } from '@angular/core/testing';

import { TypeOfRequestService } from './type-of-request.service';

describe('TypeOfRequestService', () => {
  let service: TypeOfRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeOfRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
