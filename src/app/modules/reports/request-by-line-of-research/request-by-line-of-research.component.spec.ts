import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestByLineOfResearchComponent } from './request-by-line-of-research.component';

describe('RequestByLineOfResearchComponent', () => {
  let component: RequestByLineOfResearchComponent;
  let fixture: ComponentFixture<RequestByLineOfResearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestByLineOfResearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestByLineOfResearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
