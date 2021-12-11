import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { User } from '../model/user-model';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [UserService]
    });
  });
  beforeEach(() => {
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(UserService);

  })
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should return Observable<any> in POST method', () => {
    const url = '/api/register';
    const userMock: User =
    {
        id: 'e2061e05-471f-4620-b64d-6ad8829f96eb',
        name: 'hai',
        username: 'hai',
        password: 'hai',
        email: 'hai@email.com',
        phoneNumber: '089980231233',
        address: 'hai'
    }
    service.addUser(userMock).subscribe(
      (respon: any) => {
        expect(respon).toBeDefined();
      }
    )
    const request = httpMock.expectOne(url);
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(userMock)
  })

  it('Should return Observable<any> in PUT method', () => {
    const url = '/api/user';
    const userMock: User =
    {
        id: 'e2061e05-471f-4620-b64d-6ad8829f96eb',
        name: 'hai',
        username: 'hai',
        password: 'hai',
        email: 'hai@email.com',
        phoneNumber: '089980231233',
        address: 'hai'
    }
    service.addUser(userMock).subscribe(
      (respon: any) => {
        expect(respon).toBeDefined();
      }
    )
    const request = httpMock.expectOne(url);
    expect(request.request.method).toBe('PUT');
    expect(request.request.body).toEqual(userMock)
  })

  it('Should return Observable<User[]> GET method', () => {
    const url = '/api/users';
    service.getAllUsers().subscribe(
      (respon: any) => {
        expect(respon).toBeDefined();
      }
    )
    const request = httpMock.expectOne(url);
    expect(request.request.method).toBe('GET');
  })

  it('Should return Observable<void> DELETE method', () => {
    
    const userMock: User =
    {
        id: 'e2061e05-471f-4620-b64d-6ad8829f96eb',
        name: 'hai',
        username: 'hai',
        password: 'hai',
        email: 'hai@email.com',
        phoneNumber: '089980231233',
        address: 'hai'
    }

    service.deleteUser(userMock.id!).subscribe(
      (respon: any) => {
        expect(respon).toBeFalsy();
      }
    )

    const url = `/api/user/${userMock.id}`
    service.deleteUser(userMock.id!)
    const request = httpMock.expectOne(url);
    expect(request.request.method).toBe('DELETE');
  })

  it('Should return Observable<User> GET by id method', () => {
    
    const userMock: User =
    {
        id: 'e2061e05-471f-4620-b64d-6ad8829f96eb',
        name: 'hai',
        username: 'hai',
        password: 'hai',
        email: 'hai@email.com',
        phoneNumber: '089980231233',
        address: 'hai'
    }

    service.getUsersById(userMock.id!).subscribe(
      (respon: any) => {
        expect(respon).toBeDefined();
      }
    )

    const url = `/api/user/${userMock.id}`
    service.getUsersById(userMock.id!);
    const request = httpMock.expectOne(url);
    expect(request.request.method).toBe('GET');
  })

});

