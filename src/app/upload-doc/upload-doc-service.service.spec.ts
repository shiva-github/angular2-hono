import { TestBed, inject } from '@angular/core/testing';

import { UploadDocServiceService } from './upload-doc-service.service';

describe('UploadDocServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UploadDocServiceService]
    });
  });

  it('should be created', inject([UploadDocServiceService], (service: UploadDocServiceService) => {
    expect(service).toBeTruthy();
  }));
});
