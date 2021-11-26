import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveEvaluationComponent } from './remove-evaluation.component';

describe('RemoveEvaluationComponent', () => {
  let component: RemoveEvaluationComponent;
  let fixture: ComponentFixture<RemoveEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveEvaluationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
