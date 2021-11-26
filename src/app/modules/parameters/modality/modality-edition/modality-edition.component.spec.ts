import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalityEditionComponent } from './modality-edition.component';

describe('ModalityEditionComponent', () => {
  let component: ModalityEditionComponent;
  let fixture: ComponentFixture<ModalityEditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalityEditionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalityEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
