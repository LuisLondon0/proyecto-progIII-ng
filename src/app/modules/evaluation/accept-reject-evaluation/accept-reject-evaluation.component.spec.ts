import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptRejectEvaluationComponent } from './accept-reject-evaluation.component';

describe('AcceptRejectEvaluationComponent', () => {
  let component: AcceptRejectEvaluationComponent;
  let fixture: ComponentFixture<AcceptRejectEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptRejectEvaluationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptRejectEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
