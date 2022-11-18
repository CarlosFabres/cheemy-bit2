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

  afterEach(() =>{
    localStorage.removeItem('todos');
    service = null;
  })

  /////////Prueba 1//////////

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /////////Prueba 2//////////

  it('should return an empty array', () => {
    expect(service.getTodos()).toEqual([]);
  });

  /////////Prueba 3//////////

  it('return an array with one object', () => {
    const arr = ['First Todo'];
    localStorage.setItem('todos', JSON.stringify(arr));

    expect(service.getTodos()).toEqual(arr);
    expect(service.getTodos()).toHaveSize(1);
  });
});
