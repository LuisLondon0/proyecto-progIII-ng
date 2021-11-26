import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveBondingComponent } from './remove-bonding.component';

describe('RemoveBondingComponent', () => {
  let component: RemoveBondingComponent;
  let fixture: ComponentFixture<RemoveBondingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveBondingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveBondingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
