import { TestBed } from '@angular/core/testing';

import { FirstNamesService } from './first-names.service';

describe('FirstNameService', () => {
  let service: FirstNamesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirstNamesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
