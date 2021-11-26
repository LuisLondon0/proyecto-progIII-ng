import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineOfResearchCreationComponent } from './line-of-research-creation.component';

describe('LineOfResearchCreationComponent', () => {
  let component: LineOfResearchCreationComponent;
  let fixture: ComponentFixture<LineOfResearchCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineOfResearchCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineOfResearchCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
