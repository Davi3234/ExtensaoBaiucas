import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function uppercaseValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return /[A-Z]/.test(control.value) ? null : { missingUppercase: true };
  };
}

export function lowercaseValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return /[a-z]/.test(control.value) ? null : { missingLowercase: true };
  };
}

export function numberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return /\d/.test(control.value) ? null : { missingNumber: true };
  };
}

export function symbolValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return /[&#64;$!%*?&]/.test(control.value) ? null : { missingSymbol: true };
  };
}

export function minLengthValidator(minLength: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return control.value && control.value.length >= minLength ? null : { minLength: { requiredLength: minLength } };
  };
}
