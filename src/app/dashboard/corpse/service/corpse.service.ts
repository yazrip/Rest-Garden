import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Corpses } from '../model/corpse-model';


@Injectable({
  providedIn: 'root'
})
export class CorpseService {

  readonly storage: Storage = sessionStorage;
  subject: Subject<boolean> = new Subject<boolean>();

  token: string = sessionStorage.getItem('token') as string;

  constructor(private readonly http: HttpClient) { }

  private handleError(error: any): Observable<any> {
    console.error(error);

    alert(`Terjadi Kesalahan ${error}`);

    return EMPTY;
  }

  public getAllCorpse(): Observable<Corpses[]> {
    return this.http
      .get<Corpses[]>('/api/corpses')
      .pipe(catchError((error) => this.handleError(error)));
  }

  public listUpdated(): Observable<boolean> {
    return this.subject.asObservable();
  }

  public addCorpse(corpse: Corpses): Observable<any> {
    if (corpse.id) {
      console.log(corpse);
      return this.http
        .put<Corpses>(`/api/corpse`, corpse)
        .pipe(catchError((error) => this.handleError(error)),
        map((data)=> this.subject.next(true)),
        );
    } else {
      console.log(corpse);
      return this.http
        .post<Corpses>(`/api/corpse`, corpse)
        .pipe(
          catchError((error) => this.handleError(error)),
          map((data)=> this.subject.next(true)),
        );
    }
  };
}
