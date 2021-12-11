import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Transaction } from '../model/transaction-model';

import { TransactionService } from './transaction.service';

describe('UserService', () => {
  let service: TransactionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [TransactionService]
    });
  });
  beforeEach(() => {
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(TransactionService);

  })

  it('Should return Observable<Transaction[]> GET method', () => {
    const url = '/api/transactions';
    service.getAll().subscribe(
      (respon: any) => {
        expect(respon).toBeDefined();
      }
    )
    const request = httpMock.expectOne(url);
    expect(request.request.method).toBe('GET');
  })


});
