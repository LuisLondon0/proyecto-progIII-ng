import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveLineOfResearchComponent } from './remove-line-of-research.component';

describe('RemoveLineOfResearchComponent', () => {
  let component: RemoveLineOfResearchComponent;
  let fixture: ComponentFixture<RemoveLineOfResearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveLineOfResearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveLineOfResearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
