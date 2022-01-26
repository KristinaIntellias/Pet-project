import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SignInSuccess, SignUpSuccess } from "../models/auth.model";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public url = 'http://localhost:3000/api/';

  constructor(private http: HttpClient) {}

  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  signUp(firstName: string, lastName: string, email: string, password: string): Observable<SignUpSuccess> {
    return this.http.post<SignUpSuccess>(`${this.url}signup`, { firstName, lastName, email, password });
  }

  signIn(email: string, password: string): Observable<SignInSuccess> {
    return this.http.post<SignInSuccess>(`${this.url}login`, {email, password});
  }

  logOut(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }
}
