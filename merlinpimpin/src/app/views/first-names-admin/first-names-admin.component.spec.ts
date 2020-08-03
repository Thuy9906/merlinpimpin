import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstNamesAdminComponent } from './first-names-admin.component';

describe('FirstNamesAdminComponent', () => {
  let component: FirstNamesAdminComponent;
  let fixture: ComponentFixture<FirstNamesAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstNamesAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstNamesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
