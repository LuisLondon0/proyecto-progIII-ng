import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BondingListComponent } from './bonding-list.component';

describe('BondingListComponent', () => {
  let component: BondingListComponent;
  let fixture: ComponentFixture<BondingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BondingListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BondingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
