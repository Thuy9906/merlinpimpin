import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstNameComponent } from './first-names.component';

describe('FirstNameComponent', () => {
  let component: FirstNameComponent;
  let fixture: ComponentFixture<FirstNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
