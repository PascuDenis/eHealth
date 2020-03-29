import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSpecialistsComponent } from './list-specialists.component';

describe('ListSpecialistsComponent', () => {
  let component: ListSpecialistsComponent;
  let fixture: ComponentFixture<ListSpecialistsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSpecialistsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSpecialistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
