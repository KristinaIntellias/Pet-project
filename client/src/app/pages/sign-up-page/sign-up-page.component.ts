import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";

import { Validators as CustomValidators } from '../../constants/validators';
import { RoutingEnum } from "../../models/routing.model";
import { dialogErrors, ErrorDescription, ErrorKey } from "../../constants/errors";
import { SignUpSuccess, Controls } from "../../models/auth.model";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss']
})
export class SignUpPageComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
  ) {}

  public form!: FormGroup;
  public routing = RoutingEnum;
  public serviceError!: string;
  public successRegistrationMessage!: string;
  private sub = new Subscription();
  private errorMap: Map<ErrorKey, ErrorDescription> = dialogErrors;

  ngOnInit(): void {
    this.initForm();
    this.onFormValueChanges();
  }

  ngOnDestroy (): void {
    this.sub?.unsubscribe();
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    const sub = this.authService
      .signUp(this.form.value.firstName, this.form.value.lastName, this.form.value.email, this.form.value.password)
      .subscribe({
        next: ({ message }: SignUpSuccess) => this.successRegistrationMessage = message,
        error: ({ error }: {error: string}) => this.serviceError = error
      });

    this.sub.add(sub);
  }

  getErrorMessage(control: Controls): ErrorDescription | null {
    for (let error of this.errorMap.entries()) {
      if (this.form.get(control)?.hasError(error[0])) {
        return error[1];
      }
    }
    return null;
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    },
      { validators: CustomValidators.confirmPasswordValidator }
    );
  }

  private onFormValueChanges(): void {
    const sub = this.form.valueChanges.subscribe(() => {
      this.serviceError = '';
    });

    this.sub.add(sub);
  }
}
