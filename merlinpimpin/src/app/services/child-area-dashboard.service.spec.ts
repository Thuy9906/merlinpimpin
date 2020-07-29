import { TestBed } from '@angular/core/testing';

import { ChildAreaDashboardService } from './child-area-dashboard.service';

describe('ChildAreaServiceDashboard', () => {
  let service: ChildAreaDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChildAreaDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
