import { Injectable } from '@angular/core';
import { Observable, of, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import { User } from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  private url = 'http://localhost:3000/api/users';

  getUser(): Observable<User | null> {
    const userId = this.getUserId();
    return !!userId ? this.http.get<User>(`${this.url}/${userId}`).pipe(catchError(this.errorHandler)) : of(null);
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  private errorHandler({ error }: HttpErrorResponse): Observable<never> {
    return throwError(error);
  }
}
