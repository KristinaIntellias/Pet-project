import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { RoutingEnum } from '../models/routing.model';
import { UserService } from "../services/user.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  private routing = RoutingEnum;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<UrlTree | boolean> {
    if (!this.userService.getUserId()) {
      this.goToSignIn();
    }

    return this.userService.getUser().pipe(
      map((user) => !!user || this.goToSignIn()),
      catchError(() => of(this.goToSignIn()))
    );
  }

  private goToSignIn(): UrlTree | boolean {
    this.router.navigateByUrl(this.routing.signIn);
    return false;
  }
}
