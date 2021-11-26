import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveJuryComponent } from './remove-jury.component';

describe('RemoveJuryComponent', () => {
  let component: RemoveJuryComponent;
  let fixture: ComponentFixture<RemoveJuryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveJuryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveJuryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
