import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { AuthInterceptor } from './auth.interceptor';
import {routes} from "../app-routing.module";

describe('AuthInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule.withRoutes(routes),
      HttpClientTestingModule
    ],
    providers: [
      AuthInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AuthInterceptor = TestBed.inject(AuthInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
