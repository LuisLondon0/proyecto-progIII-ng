import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BondingCreationComponent } from './bonding-creation.component';

describe('BondingCreationComponent', () => {
  let component: BondingCreationComponent;
  let fixture: ComponentFixture<BondingCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BondingCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BondingCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
