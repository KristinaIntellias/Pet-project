import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { User } from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  private url = 'http://localhost:3000/users';
  private userId = '61c87a837ccec9e3508fe7fa';

  getUser(): Observable<User> {
    return this.http.get<User>(`${this.url}/${this.userId}`);
  }
}
