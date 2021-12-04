import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Login } from 'src/app/auth/model/login-model';
import { Transaction } from '../model/transaction-model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  
  readonly storage: Storage = sessionStorage;
  subject: Subject<boolean> = new Subject<boolean>();

  token: string = sessionStorage.getItem('token') as string;

  constructor(private readonly http: HttpClient) { }

  private handleError(error: any): Observable<any> {
    console.error(error);

    alert(`Terjadi Kesalahan ${error}`);

    return EMPTY;
  }

  public getAll(): Observable<Transaction[]> {
    return this.http
      .get<Transaction[]>('http://10.10.50.35:8094/transactions')
      .pipe(catchError((error) => this.handleError(error)));
  }

  public listUpdated():Observable<boolean> {
    return this.subject.asObservable();
  }
}
