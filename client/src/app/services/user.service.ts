import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { User } from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  private url = 'http://localhost:3000/api/users';
  private userId = '61e53618d9ba246f4c2c9e82';

  getUser(): Observable<User> {
    return this.http.get<User>(`${this.url}/${this.userId}`);
  }
}
