import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthListFormComponent } from './birth-list-form.component';

describe('BirthListFormComponent', () => {
  let component: BirthListFormComponent;
  let fixture: ComponentFixture<BirthListFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BirthListFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BirthListFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
