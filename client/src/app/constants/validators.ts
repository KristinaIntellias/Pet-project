import { FormControl, FormGroup } from '@angular/forms';

export class Validators {
  static emptyState(control: FormControl): { [key: string]: boolean } | null {
    return !!control.value ? null : { emptyState: true };
  }

  static confirmPasswordValidator(formGroup: FormGroup): void {
    const password = formGroup.controls['password'];
    const confirmPassword = formGroup.controls['confirmPassword'];

    if (
      confirmPassword.errors &&
      !confirmPassword.errors['passwordMatchingError']
    ) {
      return;
    }

    confirmPassword.setErrors(
      password.value === confirmPassword.value
        ? null
        : { passwordMatchingError: true }
    );
  }
}
