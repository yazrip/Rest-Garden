import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Corpse } from '../model/corpse-model';

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

  public getAllCorpse(): Observable<Corpse[]> {
    return this.http
      .get<Corpse[]>('/api/corpses')
      .pipe(catchError((error) => this.handleError(error)));
  }

  public listUpdated(): Observable<boolean> {
    return this.subject.asObservable();
  }

  public addCorpse(corpse: Corpse): Observable<Corpse> {
    if (corpse.id) {
      return this.http.put<Corpse>('/api/corpse', corpse);
    } else {
      return this.http.post<any>('/api/corpse', corpse);
    }
  };
}
