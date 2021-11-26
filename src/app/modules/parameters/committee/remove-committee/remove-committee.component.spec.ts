import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveCommitteeComponent } from './remove-committee.component';

describe('RemoveCommitteeComponent', () => {
  let component: RemoveCommitteeComponent;
  let fixture: ComponentFixture<RemoveCommitteeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveCommitteeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveCommitteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
