import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";

import { UserService } from "../../services/user.service";
import { User } from "../../models/user.model";

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss']
})
export class SignInPageComponent implements OnInit, OnDestroy {
  constructor(private userService: UserService) {}

  public user!: User;
  private sub!: Subscription;

  ngOnInit(): void {
    this.sub = this.userService.getUser().subscribe((user: User) => this.user = user);
  }

  ngOnDestroy (): void {
    this.sub?.unsubscribe();
  }
}
