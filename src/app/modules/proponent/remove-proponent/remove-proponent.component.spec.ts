import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveProponentComponent } from './remove-proponent.component';

describe('RemoveProponentComponent', () => {
  let component: RemoveProponentComponent;
  let fixture: ComponentFixture<RemoveProponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveProponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveProponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
