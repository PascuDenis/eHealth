import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterractionsComponent } from './interractions.component';

describe('InterractionsComponent', () => {
  let component: InterractionsComponent;
  let fixture: ComponentFixture<InterractionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterractionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterractionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
