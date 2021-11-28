import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestByCommitteeComponent } from './request-by-committee.component';

describe('RequestByCommitteeComponent', () => {
  let component: RequestByCommitteeComponent;
  let fixture: ComponentFixture<RequestByCommitteeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestByCommitteeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestByCommitteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
