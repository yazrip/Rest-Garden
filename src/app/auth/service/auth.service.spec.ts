import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing'
import { AuthService } from './auth.service';
import { Login, LoginToken } from '../model/login-model'
describe('AuthService with HTTP Service', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('Should return Observable<LoginToken>', () => {
    const url = '/api/auth/login';
    const mockLogin: Login = {
      username: 'admin',
      password: 'admin'
    }
    const mockLoginToken: LoginToken = {
      token: '2132133aads'
    }
    service.signin(mockLogin)
      .subscribe((response: LoginToken) => {
        expect(response).toEqual(mockLoginToken);
    })
    
    const request = httpMock.expectOne(url);
    expect(request.request.method).toBe('POST')

    expect(request.request.body).toEqual(mockLogin)

  })
});

