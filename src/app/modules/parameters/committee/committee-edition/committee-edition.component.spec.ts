import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitteeEditionComponent } from './committee-edition.component';

describe('CommitteeEditionComponent', () => {
  let component: CommitteeEditionComponent;
  let fixture: ComponentFixture<CommitteeEditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommitteeEditionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommitteeEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
