import { TestBed } from '@angular/core/testing';

import { CorpseService } from './corpse.service';

describe('CorpseService', () => {
  let service: CorpseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorpseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
