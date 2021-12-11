import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { from, Observable } from 'rxjs';

import { AuthComponent } from './auth.component';
import { Login, LoginToken } from './model/login-model';
import { AuthService } from './service/auth.service';

describe('CredentialsComponent with DI', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthComponent],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [AuthService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    authService = TestBed.inject(AuthService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const form = (username: string, password: string) => {
    component.authForm.controls["username"].setValue(username)
    component.authForm.controls["password"].setValue(password)
  };

  it('should create', () => {
    expect(component).toBeTruthy();
  })

  it('Component Form Initial State', () => {
    expect(component.authForm).toBeDefined();
    expect(component.authForm.valid).toBeDefined();
    expect(component.authForm.invalid).toBeDefined();
  })

  it('Credentials field validity', () => {
    form('admin', 'admin');
    const todoMock: Login = { username: 'admin', password: 'admin' }
    expect(component.authForm.value).toEqual(todoMock)
  })

  it('AuthForm field validity', () => {
    let error: ValidationErrors = {};

    let username: AbstractControl = component.authForm.controls['username'];
    expect(username.valid).toBeFalse();

    error = username.errors || {};
    expect(error['required']).toBeTruthy()

    component.authForm.get('username')?.setValue('admin');
    error = username.errors! ['minlength'] || {};
    expect(error).toBeTruthy()

    username.setValue("admin");
    error = username.errors || {};
    expect(error["required"]).toBeFalsy();

    let password: AbstractControl = component.authForm.controls['password'];
    expect(password.valid).toBeFalsy();

    error = password.errors || {};
    expect(error['required']).toBeTruthy()

    component.authForm.get('password')?.setValue('admin');
    error = password.errors!['minlength'] || {};
    expect(error).toBeTruthy()

    password.setValue("admin");
    error = password.errors || {};
    expect(error["required"]).toBeFalsy();
  })

  it('Successfully login from onSubmit()', () => {
    const mockTokenLogin: LoginToken = {
      token: '123sadwqe213'
    }
    const spy = spyOn(authService, 'signin')
      .and.callThrough().and
      .callFake((): Observable<LoginToken> => {
        return from([mockTokenLogin])
      })
    component.authForm.get('username')?.setValue('admin');
    component.authForm.get('password')?.setValue('admin');
    component.onSubmit();
    expect(spy).toHaveBeenCalled();
  })

});

