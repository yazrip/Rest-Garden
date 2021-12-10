import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Grave } from '../model/grave-model';

@Injectable({
  providedIn: 'root'
})
export class GraveService {

  readonly storage: Storage = sessionStorage;
  private GraveSubject: Subject<boolean> = new Subject<boolean>();

  token: string = sessionStorage.getItem('token') as string;

  constructor(private readonly http: HttpClient) { }

  private handleError(error: any): Observable<any> {
    console.error(error);

    alert(`Terjadi Kesalahan ${error}`);

    return EMPTY;
  }

  public getAllGraves(): Observable<Grave[]> {
    return this.http
      .get<Grave[]>('/api/graves')
      .pipe(catchError((error) => this.handleError(error)));
  }

  public listUpdated(): Observable<boolean> {
    return this.GraveSubject.asObservable();
  }

  public getGravesById(id: string): Observable<Grave> {
    return this.http.get<Grave>(`/api/grave/${id}`);
  }

  public createGrave(grave: Grave): Observable<any> {
    if (grave.id) {
      console.log(grave);
      return this.http
        .put<Grave>(`/api/grave`, grave)
        .pipe(catchError((error) => this.handleError(error)),
        map((data)=> this.subject.next(true)),
        );
    } else {
      console.log(grave);
      return this.http
        .post<Grave>(`/api/grave`, grave)
        .pipe(
          catchError((error) => this.handleError(error)),
          map((data)=> this.subject.next(true)),
        );
    }
  
  };

  public deleteGrave(id: string): Observable<void> {
    return this.http.delete<void>(`/api/grave/${id}`)
    .pipe(
      map(() => this.GraveSubject.next(true))
    )
  }
}
