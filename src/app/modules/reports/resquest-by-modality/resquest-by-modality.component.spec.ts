import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResquestByModalityComponent } from './resquest-by-modality.component';

describe('ResquestByModalityComponent', () => {
  let component: ResquestByModalityComponent;
  let fixture: ComponentFixture<ResquestByModalityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResquestByModalityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResquestByModalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
