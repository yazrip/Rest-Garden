import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(private readonly router:Router) {}
  private handleError(error:HttpErrorResponse): Observable<any>{

    if (error.status === 401 || error.status === 403 || error.status === 500) {
      alert(`Terjadi Error ${error.status} ${error.statusText}`);
      this.router.navigateByUrl('/logout')
    }

    return throwError(error)
  };
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log(`Intercept ${request.method} request to ${request.url}`);
    const token: string = sessionStorage.getItem('token') as string;

    if (token) {
      const newRequest: any = request.clone();

      newRequest.headers = request.headers.set('Authorization', `Bearer ${token}`);

      return next.handle(newRequest).pipe(catchError(err => this.handleError(err)));
    }
    else{
      return next.handle(request).pipe(catchError(err => this.handleError(err)));
    }
  }
}
