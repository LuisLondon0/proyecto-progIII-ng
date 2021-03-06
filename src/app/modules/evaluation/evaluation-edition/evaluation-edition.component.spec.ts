import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationEditionComponent } from './evaluation-edition.component';

describe('EvaluationEditionComponent', () => {
  let component: EvaluationEditionComponent;
  let fixture: ComponentFixture<EvaluationEditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluationEditionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
