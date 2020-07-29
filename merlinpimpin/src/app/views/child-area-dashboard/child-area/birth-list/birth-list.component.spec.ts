import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthListComponent } from './birth-list.component';

describe('BirthListComponent', () => {
  let component: BirthListComponent;
  let fixture: ComponentFixture<BirthListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BirthListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BirthListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
