import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveModalityComponent } from './remove-modality.component';

describe('RemoveModalityComponent', () => {
  let component: RemoveModalityComponent;
  let fixture: ComponentFixture<RemoveModalityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveModalityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveModalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
