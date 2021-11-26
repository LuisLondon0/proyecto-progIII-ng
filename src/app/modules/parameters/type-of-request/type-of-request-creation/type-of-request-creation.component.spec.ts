import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeOfRequestCreationComponent } from './type-of-request-creation.component';

describe('TypeOfRequestCreationComponent', () => {
  let component: TypeOfRequestCreationComponent;
  let fixture: ComponentFixture<TypeOfRequestCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeOfRequestCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeOfRequestCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
