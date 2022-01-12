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
  private userId = '61dd7c0ed2bccd700a6e541d';

  getUser(): Observable<User> {
    return this.http.get<User>(`${this.url}/${this.userId}`);
  }
}
