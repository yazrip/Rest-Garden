import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Reservation } from './model/reservation-model';
import { ReservationService } from './service/reservation.service';
import { ReservationComponent } from './reservation.component';

describe('UserListComponent', () => {
  let component: ReservationComponent;
  let fixture: ComponentFixture<ReservationComponent>;
  let userService: ReservationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReservationComponent],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [ReservationComponent, {
        provide: ReservationService
      }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(ReservationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should Showing Reservation', () => {
    const reservationMock: Reservation[] = [
      {
        id: 'e2061e05-771f-4620-b64d-6ad8829f96eb',
        graveName: 'hello',
        gravePrice: 3,
        userName: 'hello',
        userBalance: 3,
        totalSlot: 3,
        status: 'hello',
        expiredDate: 'hello',
        description: 'hello'
      },
      {
        id: 'e2061e05-551f-4620-b64d-6ad8829f96eb',
        graveName: 'hallo',
        gravePrice: 2,
        userName: 'hallo',
        userBalance: 2,
        totalSlot: 2,
        status: 'hallo',
        expiredDate: 'hallo',
        description: 'hallo',
      },
      {
        id: 'e2061e05-471f-4620-b64d-6ad8829f96eb',
        graveName: 'hai',
        gravePrice: 2,
        userName: 'hai',
        userBalance: 2,
        totalSlot: 2,
        status: 'hai',
        expiredDate: 'hai',
        description: 'hai',
      },
    ];
    component.ngOnInit();
    component.reservations = reservationMock;
    expect(component.reservations).toEqual(reservationMock);
    expect(component.reservations.length).toEqual(reservationMock.length);
  })
});
