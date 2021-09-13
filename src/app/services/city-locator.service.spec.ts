import { TestBed } from '@angular/core/testing';

import { CityLocatorService } from './city-locator.service';

describe('CityLocatorService', () => {
  let service: CityLocatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CityLocatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
