import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeOfRequestListComponent } from './type-of-request-list.component';

describe('TypeOfRequestListComponent', () => {
  let component: TypeOfRequestListComponent;
  let fixture: ComponentFixture<TypeOfRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeOfRequestListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeOfRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
