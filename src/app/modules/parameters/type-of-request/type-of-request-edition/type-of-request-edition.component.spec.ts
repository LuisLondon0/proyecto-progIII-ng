import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeOfRequestEditionComponent } from './type-of-request-edition.component';

describe('TypeOfRequestEditionComponent', () => {
  let component: TypeOfRequestEditionComponent;
  let fixture: ComponentFixture<TypeOfRequestEditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeOfRequestEditionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeOfRequestEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
