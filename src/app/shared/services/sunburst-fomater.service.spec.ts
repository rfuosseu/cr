import { TestBed } from '@angular/core/testing';

import { SunburstFomaterService } from './sunburst-fomater.service';

describe('SunburstFomaterService', () => {
  let service: SunburstFomaterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SunburstFomaterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
