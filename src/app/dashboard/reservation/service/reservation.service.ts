import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Reservation } from '../model/reservation-model';


@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  readonly storage: Storage = sessionStorage;
  subject: Subject<boolean> = new Subject<boolean>();

  token: string = sessionStorage.getItem('token') as string;

  constructor(private readonly http: HttpClient) { }

  private handleError(error: any): Observable<any> {
    console.error(error);

    alert(`Terjadi Kesalahan ${error}`);

    return EMPTY;
  }

  public getAll(): Observable<Reservation[]> {
    return this.http
      .get<Reservation[]>('/api/reservations')
      .pipe(catchError((error) => this.handleError(error)));
  }

  public listUpdated():Observable<boolean> {
    return this.subject.asObservable();
  }
}
