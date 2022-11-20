import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ApirestService } from './apirest.service';

describe('ApirestService', () => {
  let service: ApirestService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ApirestService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(()=>{
    httpTestingController.verify();
  });

  //////////Prueba 1//////////////

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //////////Prueba 2//////////////

  it('should make an API call', () => {
    const mockResponse = [
      {
        id:1,
        nombre: 'v.rosendo5',
        clave: 'J.12mm5',
        id_rol: 1,
      },
    ];

    service.getProducts().subscribe((res)=>{
      console.log('result', res);
      expect(res).toBeTruthy();
      expect(res).toHaveSize(1);
      const product = res[0];
      expect(product).toBe(mockResponse[0]);
    });

    const mockRequest = httpTestingController.expectOne(
      'https://my-json-server.typicode.com/victorrosendo/repoUsuariosRamos'
    );

    expect(mockRequest.request.method).toEqual('GET');

    mockRequest.flush(mockResponse);
  });

  /////////////Prueba3/////////////

  it('should make an API call 2', () => {
    const mockResponse = [
      {
        patente: 'FF-HH-22',
        id_usuario: '1',
        marca: 'Audi',
        
      },
    ];

    service.getProducts2().subscribe((res)=>{
      console.log('result', res);
      expect(res).toBeTruthy();
      expect(res).toHaveSize(1);
      const product = res[0];
      expect(product).toBe(mockResponse[0]);
    });

    const mockRequest = httpTestingController.expectOne(
      'https://my-json-server.typicode.com/victorrosendo/repoListadoAutos'
    );

    expect(mockRequest.request.method).toEqual('GET');

    mockRequest.flush(mockResponse);
  });
});
