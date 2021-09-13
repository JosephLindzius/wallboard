import { TestBed } from '@angular/core/testing';

import { GeolocationLookupService } from './geolocation-lookup.service';

describe('GeolocationLookupService', () => {
  let service: GeolocationLookupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeolocationLookupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
