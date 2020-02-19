import { TestBed } from '@angular/core/testing';

import { InMemoryDrugService } from './in-memory-drug.service';

describe('InMemoryDrugService', () => {
  let service: InMemoryDrugService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InMemoryDrugService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
