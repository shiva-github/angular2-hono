import { TestBed, inject } from '@angular/core/testing';

import { LinksTableService } from './links-table.service';

describe('LinksTableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LinksTableService]
    });
  });

  it('should be created', inject([LinksTableService], (service: LinksTableService) => {
    expect(service).toBeTruthy();
  }));
});
