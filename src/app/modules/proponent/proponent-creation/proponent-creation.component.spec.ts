import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProponentCreationComponent } from './proponent-creation.component';

describe('ProponentCreationComponent', () => {
  let component: ProponentCreationComponent;
  let fixture: ComponentFixture<ProponentCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProponentCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProponentCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
