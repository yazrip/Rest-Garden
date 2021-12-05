import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Grave } from '../model/grave-model';

@Injectable({
  providedIn: 'root'
})
export class GraveService {

  readonly storage: Storage = sessionStorage;
  subject: Subject<boolean> = new Subject<boolean>();

  token: string = sessionStorage.getItem('token') as string;

  constructor(private readonly http: HttpClient) { }

  private handleError(error: any): Observable<any> {
    console.error(error);

    alert(`Terjadi Kesalahan ${error}`);

    return EMPTY;
  }

  public getAllGraves(): Observable<Grave[]> {
    return this.http
      .get<Grave[]>('http://10.10.50.35:8094/graves')
      .pipe(catchError((error) => this.handleError(error)));
  }

  public listUpdated(): Observable<boolean> {
    return this.subject.asObservable();
  }

  public getGravesById(id: string): Observable<Grave> {
    return this.http.get<Grave>(`http://10.10.50.35:8094/grave/${id}`);
  }

  public createGrave(grave: Grave): Observable<Grave> {
    if (grave.id) {
      return this.http.put<Grave>('http://10.10.50.35:8094/grave', grave);
    } else {
      return this.http.post<any>('http://10.10.50.35:8094/grave', grave);
    }
  
  };

  public deleteGrave(id: string): Observable<void> {
    return this.http.delete<void>(`http://10.10.50.35:8094/grave/${id}`)
  }
}
