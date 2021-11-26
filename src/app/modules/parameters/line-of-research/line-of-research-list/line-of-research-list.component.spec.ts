import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineOfResearchListComponent } from './line-of-research-list.component';

describe('LineOfResearchListComponent', () => {
  let component: LineOfResearchListComponent;
  let fixture: ComponentFixture<LineOfResearchListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineOfResearchListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineOfResearchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
