import { TestBed } from '@angular/core/testing';

import { LineOfResearchService } from './line-of-research.service';

describe('LineOfResearchService', () => {
  let service: LineOfResearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LineOfResearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
