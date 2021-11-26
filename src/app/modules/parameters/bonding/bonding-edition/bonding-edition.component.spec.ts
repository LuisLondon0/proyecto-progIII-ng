import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BondingEditionComponent } from './bonding-edition.component';

describe('BondingEditionComponent', () => {
  let component: BondingEditionComponent;
  let fixture: ComponentFixture<BondingEditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BondingEditionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BondingEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
