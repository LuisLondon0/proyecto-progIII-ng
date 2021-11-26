import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineOfResearchEditionComponent } from './line-of-research-edition.component';

describe('LineOfResearchEditionComponent', () => {
  let component: LineOfResearchEditionComponent;
  let fixture: ComponentFixture<LineOfResearchEditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineOfResearchEditionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineOfResearchEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
