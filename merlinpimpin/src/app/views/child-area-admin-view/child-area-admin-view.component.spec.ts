import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildAreaAdminViewComponent } from './child-area-admin-view.component';

describe('ChildAreaAdminViewComponent', () => {
  let component: ChildAreaAdminViewComponent;
  let fixture: ComponentFixture<ChildAreaAdminViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildAreaAdminViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildAreaAdminViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
