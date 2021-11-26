import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveRequestComponent } from './remove-request.component';

describe('RemoveRequestComponent', () => {
  let component: RemoveRequestComponent;
  let fixture: ComponentFixture<RemoveRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
