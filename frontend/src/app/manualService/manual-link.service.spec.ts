import { TestBed } from '@angular/core/testing';

import { ManualLinkService } from './manual-link.service';

describe('ManualLinkService', () => {
  let service: ManualLinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManualLinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
