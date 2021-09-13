import { TestBed } from '@angular/core/testing';

import { InspirationQuoteService } from './inspiration-quote.service';

describe('InspirationQuoteService', () => {
  let service: InspirationQuoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InspirationQuoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
