import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";

import { AuthService } from "../services/auth.service";
import {Router} from "@angular/router";
import {RoutingEnum} from "../models/routing.model";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  private routing = RoutingEnum;

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userToken = this.authService.getToken();
    const modifiedRequest = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${userToken}`),
    });
    return next.handle(modifiedRequest)
      .pipe(
        tap({
          next: () => {},
          error: (err) => {
            if (err instanceof HttpErrorResponse && err.status === 401) {
              localStorage.removeItem('token');
              localStorage.removeItem('userId');
              this.router.navigate([this.routing.signIn]);
            }
          }})
      )
  }
}
