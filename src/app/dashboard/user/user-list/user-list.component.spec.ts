import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { User } from '../model/user-model';
import { UserService } from '../service/user.service';

import { UserListComponent } from './user-list.component';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserListComponent],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [UserListComponent, {
        provide: UserService
      }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should Showing User', () => {
    const userMock: User[] = [
      {
        id: 'e2061e05-771f-4620-b64d-6ad8829f96eb',
        name: 'hello',
        username: 'hello',
        password: 'hello',
        email: 'hello@email.com',
        phoneNumber: '089980231231',
        address: 'hello'
      },
      {
        id: 'e2061e05-551f-4620-b64d-6ad8829f96eb',
        name: 'hallo',
        username: 'hallo',
        password: 'hallo',
        email: 'hallo@email.com',
        phoneNumber: '089980231232',
        address: 'hallo'
      },
      {
        id: 'e2061e05-471f-4620-b64d-6ad8829f96eb',
        name: 'hai',
        username: 'hai',
        password: 'hai',
        email: 'hai@email.com',
        phoneNumber: '089980231233',
        address: 'hai'
      },
    ];
    component.ngOnInit();
    component.users = userMock;
    expect(component.users).toEqual(userMock);
    expect(component.users.length).toEqual(userMock.length);
  })
  it('Should onDelete isDefined', () => {
    expect(component.onDeleteUser).toBeDefined();
  })
});
