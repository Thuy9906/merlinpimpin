import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildAreaFormComponent } from './child-area-form.component';

describe('SingleChildFormComponent', () => {
  let component: ChildAreaFormComponent;
  let fixture: ComponentFixture<ChildAreaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildAreaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildAreaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
