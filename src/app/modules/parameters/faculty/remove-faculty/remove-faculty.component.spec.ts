import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveFacultyComponent } from './remove-faculty.component';

describe('RemoveFacultyComponent', () => {
  let component: RemoveFacultyComponent;
  let fixture: ComponentFixture<RemoveFacultyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveFacultyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveFacultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
