import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BabyRegistryAdminComponent } from './baby-registry-admin.component';

describe('BabyRegistryAdminComponent', () => {
  let component: BabyRegistryAdminComponent;
  let fixture: ComponentFixture<BabyRegistryAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BabyRegistryAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BabyRegistryAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
