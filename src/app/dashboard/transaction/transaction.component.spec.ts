import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Transaction } from './model/transaction-model';
import { TransactionService } from './service/transaction.service';
import { TransactionComponent } from './transaction.component';

describe('UserListComponent', () => {
  let component: TransactionComponent;
  let fixture: ComponentFixture<TransactionComponent>;
  let userService: TransactionService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionComponent],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [TransactionComponent, {
        provide: TransactionService
      }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(TransactionService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should Showing User', () => {
    const transactionMock: Transaction[] = [
      {
        id: 'e2061e05-771f-4620-b64d-6ad8829f96eb',
        userName: 'hello',
        userBalance: 'hello',
        graveName: 'hello',
        gravePrice: 200000,
        totalSlot: 21,
        date: 'hello',
        description: 'hello'
      },
      {
        id: 'e2061e05-551f-4620-b64d-6ad8829f96eb',
        userName: 'hallo',
        userBalance: 'hallo',
        graveName: 'hallo',
        gravePrice: 200000,
        totalSlot: 21,
        date: 'hallo',
        description: 'hallo'
      },
      {
        id: 'e2061e05-471f-4620-b64d-6ad8829f96eb',
        userName: 'hai',
        userBalance: 'hai',
        graveName: 'hai',
        gravePrice: 200000,
        totalSlot: 21,
        date: 'hai',
        description: 'hai'
      },
    ];
    component.ngOnInit();
    component.transactions = transactionMock;
    expect(component.transactions).toEqual(transactionMock);
    expect(component.transactions.length).toEqual(transactionMock.length);
  })
});
