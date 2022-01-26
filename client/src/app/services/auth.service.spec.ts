import { TestBed } from '@angular/core/testing';
import { HttpResponse } from "@angular/common/http";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

import { AuthService } from './auth.service';
import { SignInSuccess, SignUpSuccess } from "../models/auth.model";

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  const mockData = {
    firstName: "Nataliia",
    lastName: "Petrova",
    email: "exam@gmail.com",
    password: '111111'
  };
  const mockResSignUp: SignUpSuccess = { message: 'You have been successfully registered' };
  const mockResSignIn: SignInSuccess = { token: 'token', id: '61e53618d9ba246f4c2c9e82' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    }).compileComponents();
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should receive token from Local Storage', () => {
    spyOn(service, 'getToken').and.callFake(() => '');
    expect(service.getToken()).toEqual('')
    expect(service.getToken).toHaveBeenCalled();
  });

  it('should receive signup answer from API via POST', () => {
    let res: SignUpSuccess | undefined;
    const { firstName, lastName, email, password } = mockData;
    service.signUp(firstName, lastName, email, password).subscribe(data => res = data);

    const req = httpMock.expectOne(`${service.url}signup`);
    expect(req.request.method).toBe('POST');

    const expectedResponse = new HttpResponse({ status: 201, statusText: 'Created', body: mockResSignUp });
    req.event(expectedResponse);

    req.flush(mockResSignUp);

    expect(res).toEqual(mockResSignUp);
  });

  it('should receive signin answer from API via POST', () => {
    let res: SignInSuccess | undefined;
    const { email, password } = mockData;
    service.signIn(email, password).subscribe(data => res = data);

    const req = httpMock.expectOne(`${service.url}login`);
    expect(req.request.method).toBe('POST');

    const expectedResponse = new HttpResponse({ status: 200, statusText: 'OK', body: mockResSignIn });
    req.event(expectedResponse);

    req.flush(mockResSignIn);

    expect(res).toEqual(mockResSignIn);
  });

  it('should delete token and userId from Local Storage', () => {
    spyOn(service, 'logOut').and.callThrough();
    expect(service.logOut()).toBeFalsy();
    expect(service.logOut).toHaveBeenCalledTimes(1);
  });
});
