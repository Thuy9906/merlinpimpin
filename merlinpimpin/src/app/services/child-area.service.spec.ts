import { TestBed } from '@angular/core/testing';

import { ChildAreaService } from './child-area.service';

describe('ChildAreaService', () => {
  let service: ChildAreaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChildAreaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
