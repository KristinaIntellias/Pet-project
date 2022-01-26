import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    }).compileComponents();
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should has been called', () => {
    spyOn(service, 'getUser');
    service.getUser();
    expect(service.getUser).toBeTruthy();
    expect(service.getUser).toHaveBeenCalled();
  });

  it('should receive user id from Local Storage', () => {
    spyOn(service, 'getUserId').and.callFake(() => null);
    expect(service.getUserId()).toEqual(null)
    expect(service.getUserId).toHaveBeenCalled();
  });
});
