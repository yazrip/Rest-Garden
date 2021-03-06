import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, Subject } from 'rxjs';
import { catchError, map} from 'rxjs/operators';
import { User } from '../model/user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly storage: Storage = sessionStorage;
  // subject: Subject<boolean> = new Subject<boolean>();

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

  // public listUpdated(): Observable<boolean> {
  //   return this.subject.asObservable();
  // }

  public addUser(user: User): Observable<any> {
    if (user.id) {
      console.log(user);
      return this.http
        .put<User>(`/api/user`, user)
        .pipe(catchError((error) => this.handleError(error)),
        // map((data)=> this.subject.next(true)),
        );
    } else {
      console.log(user);
      return this.http
        .post<User>(`/api/register`, user)
        .pipe(
          catchError((error) => this.handleError(error)),
          // map((data)=> this.subject.next(true)),
        );
    }
  };

  public deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`/api/user/${id}`)
  }

}
