import { TestBed } from '@angular/core/testing';

import { DogPictureService } from './dog-picture.service';

describe('DogPictureService', () => {
  let service: DogPictureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DogPictureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
