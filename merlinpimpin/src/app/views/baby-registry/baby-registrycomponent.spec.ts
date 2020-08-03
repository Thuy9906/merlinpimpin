import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BabyRegistryComponent } from './baby-registry.component';

describe('BabyRegistryComponent', () => {
  let component: BabyRegistryComponent;
  let fixture: ComponentFixture<BabyRegistryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BabyRegistryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BabyRegistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
