import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuryEditionComponent } from './jury-edition.component';

describe('JuryEditionComponent', () => {
  let component: JuryEditionComponent;
  let fixture: ComponentFixture<JuryEditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JuryEditionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JuryEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
