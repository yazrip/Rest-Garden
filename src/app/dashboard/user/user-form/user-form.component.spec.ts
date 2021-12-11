import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { User } from '../model/user-model';
import { UserService } from '../service/user.service';

import { UserFormComponent } from './user-form.component';

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;
  let guestService: UserService;
  let httpMock: HttpTestingController;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserFormComponent],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [UserService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    guestService = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();

  });

  it('Components create', () => {
    expect(component).toBeTruthy();
  });

  it('UserForm check validity', () => {
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

    component.id = userMock.id as string;
    component.setFormValues(userMock);
    expect(component.userForm.value).toEqual(userMock);
  })

  it('Should return false if form be set', () => {
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
    component.setFormValues(userMock);
    const form: boolean = component.isValid();
    expect(form).toBeFalse();
  })

  it('Should return true if form be not set', () => {
    
    const form: boolean = component.isValid();
    expect(form).toBeTrue();
  })

  it('Should return is-valid if form null', () => {
    const userMock: User =
    {
      id: 'e2061e05-771f-4620-b64d-6ad8829f96eb',
        name: 'hello',
        username: 'hello',
        password: 'hello',
        email: 'hello@email.com',
        phoneNumber: '089980231231',
        address: 'hello'
    }
    component.setFormValues(userMock);
    const form: string = component.isFieldValid('username');
    expect(form).toEqual('is-valid');
  })

  it('Should return " " if form set and valid', () => {
    const userMock: User =
    {
      id: 'e2061e05-551f-4620-b64d-6ad8829f96eb',
        name: 'hallo',
        username: 'hallo',
        password: 'hallo',
        email: 'hallo@email.com',
        phoneNumber: '089980231232',
        address: 'hallo'
    }
    component.setFormValues(userMock);
    const form: string = component.isFieldValid('username');
    expect(form).toEqual('');
  })

});
