import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from "rxjs";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";

import { SignUpPageComponent } from './sign-up-page.component';
import { AuthService } from "../../services/auth.service";

describe('SignUpPageComponent', () => {
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let component: SignUpPageComponent;
  let fixture: ComponentFixture<SignUpPageComponent>;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj<AuthService>('AuthService', ['signUp']);
    await TestBed.configureTestingModule({
      declarations: [SignUpPageComponent],
      imports: [RouterTestingModule, FormsModule, ReactiveFormsModule],
      providers: [{provide: AuthService, useValue: mockAuthService }],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should create form with 5 controls', () => {
    expect(component.form.contains('firstName')).toBeTruthy();
    expect(component.form.contains('lastName')).toBeTruthy();
    expect(component.form.contains('email')).toBeTruthy();
    expect(component.form.contains('password')).toBeTruthy();
    expect(component.form.contains('confirmPassword')).toBeTruthy();
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
    expect(component.routing).toBeDefined();
    expect(component.serviceError).toBeUndefined();
    expect(component.successRegistrationMessage).toBeUndefined();
  });

  it('should render success message on submit after checking that form is valid', async () => {
    const msg = { message: 'You have been successfully registered' };
    component.form.get('firstName')?.setValue('Anna');
    component.form.get('lastName')?.setValue('Sydorova');
    component.form.get('email')?.setValue('test@test.com');
    component.form.get('password')?.setValue('123456');
    component.form.get('confirmPassword')?.setValue('123456');

    mockAuthService.signUp.and.returnValue(of(msg));
    component.submit();
    await fixture.whenStable();
    expect(component.form.valid).toBeTruthy();
    expect(component.successRegistrationMessage).toBe(msg.message);
  });
});
