import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

import { BDService } from './bd.service';

describe('BDService', () => {
  let service: BDService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[SQLite, HttpClient, HttpHandler]
    });
    service = TestBed.inject(BDService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
