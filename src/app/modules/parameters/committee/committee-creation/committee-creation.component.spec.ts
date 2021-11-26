import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitteeCreationComponent } from './committee-creation.component';

describe('CommitteeCreationComponent', () => {
  let component: CommitteeCreationComponent;
  let fixture: ComponentFixture<CommitteeCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommitteeCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommitteeCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
