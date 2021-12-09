import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProponentEditionComponent } from './proponent-edition.component';

describe('ProponentEditionComponent', () => {
  let component: ProponentEditionComponent;
  let fixture: ComponentFixture<ProponentEditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProponentEditionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProponentEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
