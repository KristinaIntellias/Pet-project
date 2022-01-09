import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";

import { UserService } from "../../services/user.service";
import { User } from "../../models/user.model";

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss']
})
export class SignInPageComponent implements OnInit {
  constructor(private userService: UserService) {}

  public user$!: Observable<User>;

  ngOnInit(): void {
    this.user$ = this.userService.getUser();
  }
}
