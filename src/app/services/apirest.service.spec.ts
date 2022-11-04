import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ApirestService } from './apirest.service';

describe('ApirestService', () => {
  let service: ApirestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[HttpClient, HttpHandler]
    });
    service = TestBed.inject(ApirestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
