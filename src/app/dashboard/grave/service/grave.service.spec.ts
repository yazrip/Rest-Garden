import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Grave } from '../model/grave-model';

import { GraveService } from './grave.service';

describe('UserService', () => {
  let service: GraveService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [GraveService]
    });
  });
  beforeEach(() => {
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(GraveService);

  })
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should return Observable<any> in POST method', () => {
    const url = '/api/graves';
    const graveMock: Grave =
    {
        id: 'e2061e05-471f-4620-b64d-6ad8829f96eb',
        name: 'hai',
        type: 'hai',
        availableSlots: 12,
        phoneNumber: '089980231233',
        price: 12,
        address: 'hai',
        description: 'hai'
    }
    service.createGrave(graveMock).subscribe(
      (respon: any) => {
        expect(respon).toBeDefined();
      }
    )
    const request = httpMock.expectOne(url);
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(graveMock)
  })

  it('Should return Observable<any> in PUT method', () => {
    const url = '/api/graves';
    const graveMock: Grave =
    {
        id: 'e2061e05-471f-4620-b64d-6ad8829f96eb',
        name: 'hai',
        type: 'hai',
        availableSlots: 12,
        phoneNumber: '089980231233',
        price: 12,
        address: 'hai',
        description: 'hai'
    }
    service.createGrave(graveMock).subscribe(
      (respon: any) => {
        expect(respon).toBeDefined();
      }
    )
    const request = httpMock.expectOne(url);
    expect(request.request.method).toBe('PUT');
    expect(request.request.body).toEqual(graveMock)
  })

  it('Should return Observable<Grave[]> GET method', () => {
    const url = '/api/users';
    service.getAllGraves().subscribe(
      (respon: any) => {
        expect(respon).toBeDefined();
      }
    )
    const request = httpMock.expectOne(url);
    expect(request.request.method).toBe('GET');
  })

  it('Should return Observable<void> DELETE method', () => {
    
    const graveMock: Grave =
    {
        id: 'e2061e05-471f-4620-b64d-6ad8829f96eb',
        name: 'hai',
        type: 'hai',
        availableSlots: 12,
        phoneNumber: '089980231233',
        price: 12,
        address: 'hai',
        description: 'hai'
    }

    service.deleteGrave(graveMock.id!).subscribe(
      (respon: any) => {
        expect(respon).toBeFalsy();
      }
    )

    const url = `/api/grave/${graveMock.id}`
    service.deleteGrave(graveMock.id!)
    const request = httpMock.expectOne(url);
    expect(request.request.method).toBe('DELETE');
  })

  it('Should return Observable<User> GET by id method', () => {
    
    const graveMock: Grave =
    {
        id: 'e2061e05-471f-4620-b64d-6ad8829f96eb',
        name: 'hai',
        type: 'hai',
        availableSlots: 12,
        phoneNumber: '089980231233',
        price: 12,
        address: 'hai',
        description: 'hai'
    }
    service.getGravesById(graveMock.id!).subscribe(
      (respon: any) => {
        expect(respon).toBeDefined();
      }
    )

    const url = `/api/grave/${graveMock.id}`
    service.getGravesById(graveMock.id!);
    const request = httpMock.expectOne(url);
    expect(request.request.method).toBe('GET');
  })

});
