import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { of } from "rxjs";
import { By } from "@angular/platform-browser";

import { SignInPageComponent } from './sign-in-page.component';
import { AuthService } from "../../services/auth.service";
import { RoutingEnum } from "../../models/routing.model";

describe('SignInPageComponent', () => {
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let component: SignInPageComponent;
  let fixture: ComponentFixture<SignInPageComponent>;
  let router: Router;
  const routing = RoutingEnum;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj<AuthService>('AuthService', ['signIn']);
    await TestBed.configureTestingModule({
      declarations: [SignInPageComponent],
      imports: [RouterTestingModule, FormsModule, ReactiveFormsModule],
      providers: [{provide: AuthService, useValue: mockAuthService }],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    fixture = TestBed.createComponent(SignInPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should create form with 2 controls', () => {
    expect(component.form.contains('email')).toBeTruthy();
    expect(component.form.contains('password')).toBeTruthy();
  });

  it('should render error message', () => {
    const errorMessage = 'Error occurred';
    component.serviceError = errorMessage;
    fixture.detectChanges();
    const debug = fixture.debugElement.query(By.css('.app-form__error'));
    const el: HTMLElement = debug.nativeElement.textContent;
    expect(el).toContain(errorMessage);
  });

  it('component initial state', () => {
    expect(component.submit).toBeDefined();
    expect(component.ngOnInit).toBeDefined();
    expect(component.getErrorMessage).toBeDefined();
    expect(component.form.invalid).toBeTruthy();
    expect(component.serviceError).toBeUndefined();
  });

  it('should navigate on submit after checking that form is valid', async () => {
    component.form.get('email')?.setValue('test@test.com');
    component.form.get('password')?.setValue('123456');

    mockAuthService.signIn.and.returnValue(of({token: '', id: ''}));
    component.submit();
    await fixture.whenStable();
    expect(component.form.valid).toBeTruthy();
    expect(router.navigate).toHaveBeenCalledWith([routing.home]);
  });
});
