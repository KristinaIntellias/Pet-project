import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from "../services/auth.service";
import {tap} from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userToken = this.authService.getToken();
    const modifiedRequest = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${userToken}`),
    });
    return next.handle(modifiedRequest);
  }
}
