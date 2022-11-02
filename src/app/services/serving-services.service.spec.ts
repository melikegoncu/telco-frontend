import { TestBed } from '@angular/core/testing';

import { ServingServicesService } from './serving-services.service';

describe('ServingServicesService', () => {
  let service: ServingServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServingServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
