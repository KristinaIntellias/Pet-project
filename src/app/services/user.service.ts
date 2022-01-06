import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

import { User } from "../models/user.model";
import { user } from "../mocks/user.mock";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user$ = new BehaviorSubject<User>(user);
}
