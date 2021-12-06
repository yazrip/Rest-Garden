import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../model/user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly storage: Storage = sessionStorage;
  subject: Subject<boolean> = new Subject<boolean>();

  token: string = sessionStorage.getItem('token') as string;

  constructor(private readonly http: HttpClient) {}

  private handleError(error: any): Observable<any> {
    console.error(error);

    alert(`Terjadi kesalahan ${error}`);

    return EMPTY;
  }

  public getUsersById(id: string): Observable<User> {
    return this.http.get<User>(`/api/user/${id}`);
  }

  public getAllUsers(): Observable<User[]> {
    return this.http
      .get<User[]>('/api/users')
      .pipe(catchError((error) => this.handleError(error)));
  }

  public listUpdated(): Observable<boolean> {
    return this.subject.asObservable();
  }

  public addUser(user: User): Observable<User> {
    if (user.id) {
      return this.http.put<User>('/api/user', user);
    } else {
      return this.http.post<any>('/api/register', user);
    }
  };

  public deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`/api/user/${id}`)
  }

}
