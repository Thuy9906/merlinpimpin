import { TestBed } from '@angular/core/testing';

import { BabyRegistryService } from './baby-registry.service';

describe('BabyRegistryService', () => {
  let service: BabyRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BabyRegistryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
