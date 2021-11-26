import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentEditionComponent } from './department-edition.component';

describe('DepartmentEditionComponent', () => {
  let component: DepartmentEditionComponent;
  let fixture: ComponentFixture<DepartmentEditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentEditionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
