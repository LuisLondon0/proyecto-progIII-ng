import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProponentListComponent } from './proponent-list.component';

describe('ProponentListComponent', () => {
  let component: ProponentListComponent;
  let fixture: ComponentFixture<ProponentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProponentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProponentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
