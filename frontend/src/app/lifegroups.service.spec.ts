import { TestBed, inject } from '@angular/core/testing';

import { LifegroupsService } from './lifegroups.service';

describe('LifegroupsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LifegroupsService]
    });
  });

  it('should be created', inject([LifegroupsService], (service: LifegroupsService) => {
    expect(service).toBeTruthy();
  }));
});
