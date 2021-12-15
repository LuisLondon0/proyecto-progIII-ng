import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestByTypeComponent } from './request-by-type.component';

describe('RequestByTypeComponent', () => {
  let component: RequestByTypeComponent;
  let fixture: ComponentFixture<RequestByTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestByTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestByTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
