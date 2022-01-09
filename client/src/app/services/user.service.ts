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
  private userId = '61da9d850a08dbf7f4f7ae54';

  getUser(): Observable<User> {
    return this.http.get<User>(`${this.url}/${this.userId}`);
  }
}
