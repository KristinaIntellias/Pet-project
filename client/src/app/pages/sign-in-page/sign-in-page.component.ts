import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { AuthService } from "../../services/auth.service";
import { RoutingEnum } from "../../models/routing.model";
import { SignInSuccess, Controls } from "../../models/auth.model";
import { ErrorDescription, ErrorKey, dialogErrors } from "../../constants/errors";

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss']
})
export class SignInPageComponent implements OnInit, OnDestroy {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  public form!: FormGroup;
  public serviceError!: string;
  private sub = new Subscription();
  private routing = RoutingEnum;
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
      .signIn(this.form.value.email, this.form.value.password)
      .subscribe({
        next: (response: SignInSuccess) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('userId', response.id);
          this.router.navigate([this.routing.home]);
        },
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
    this.form = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  private onFormValueChanges(): void {
    const sub = this.form.valueChanges.subscribe(() => {
      this.serviceError = '';
    });

    this.sub.add(sub);
  }
}
