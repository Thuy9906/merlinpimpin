import { TestBed } from '@angular/core/testing';

import { BirthListService } from './birth-list.service';

describe('BirthListService', () => {
  let service: BirthListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BirthListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
