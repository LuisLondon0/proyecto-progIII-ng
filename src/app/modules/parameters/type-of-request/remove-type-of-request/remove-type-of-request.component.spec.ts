import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveTypeOfRequestComponent } from './remove-type-of-request.component';

describe('RemoveTypeOfRequestComponent', () => {
  let component: RemoveTypeOfRequestComponent;
  let fixture: ComponentFixture<RemoveTypeOfRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveTypeOfRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveTypeOfRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
