import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalityCreationComponent } from './modality-creation.component';

describe('ModalityCreationComponent', () => {
  let component: ModalityCreationComponent;
  let fixture: ComponentFixture<ModalityCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalityCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalityCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
