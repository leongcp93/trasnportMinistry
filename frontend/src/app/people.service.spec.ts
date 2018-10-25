import { TestBed, inject } from '@angular/core/testing';

import { PeopleService } from './people.service';

describe('PeopleServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PeopleService]
    });
  });

  it('should be created', inject([PeopleService], (service: PeopleService) => {
    expect(service).toBeTruthy();
  }));
});
