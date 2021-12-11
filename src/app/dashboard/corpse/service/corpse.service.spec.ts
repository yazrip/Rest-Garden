import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Grave } from '../../grave/model/grave-model';
import { Corpses } from '../model/corpse-model';

import { CorpseService } from './corpse.service';

describe('UserService', () => {
  let service: CorpseService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [CorpseService]
    });
  });
  beforeEach(() => {
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(CorpseService);

  })
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should return Observable<any> in POST method', () => {
    const url = '/api/corpse';
    const grave: Grave = {
      id: '1',
      address: 'Jl Bareng',
      availableSlots: 10,
      description: 'Ada AC',
      name: 'Jiha',
      phoneNumber: '091212',
      price: 60000,
      type: 'Private'
    }
    const corpseMock: Corpses =
    {
      id: 'e2061e05-471f-4620-b64d-6ad8829f96eb',
      name: 'hai',
      parentName: 'hai',
      location: 'hai',
      grave: grave,
    }
    service.addCorpse(corpseMock).subscribe(
      (respon: any) => {
        expect(respon).toBeDefined();
      }
    )
    const request = httpMock.expectOne(url);
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(corpseMock)
  })

  it('Should return Observable<any> in PUT method', () => {
    const url = '/api/corpse';
    const grave: Grave = {
      id: '1',
      address: 'Jl Bareng',
      availableSlots: 10,
      description: 'Ada AC',
      name: 'Jiha',
      phoneNumber: '091212',
      price: 60000,
      type: 'Private'
    }
    const corpseMock: Corpses =
    {
      id: 'e2061e05-471f-4620-b64d-6ad8829f96eb',
      name: 'hai',
      parentName: 'hai',
      location: 'hai',
      grave: grave,
    }
    service.addCorpse(corpseMock).subscribe(
      (respon: any) => {
        expect(respon).toBeDefined();
      }
    )
    const request = httpMock.expectOne(url);
    expect(request.request.method).toBe('PUT');
    expect(request.request.body).toEqual(corpseMock)
  })

  it('Should return Observable<Corpse[]> GET method', () => {
    const url = '/api/corpses';
    service.getAllCorpse().subscribe(
      (respon: any) => {
        expect(respon).toBeDefined();
      }
    )
    const request = httpMock.expectOne(url);
    expect(request.request.method).toBe('GET');
  })


});
