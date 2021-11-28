import { TestBed } from '@angular/core/testing';

import { facultyService } from './faculty.service';

describe('facultyService', () => {
  let service: facultyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(facultyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
