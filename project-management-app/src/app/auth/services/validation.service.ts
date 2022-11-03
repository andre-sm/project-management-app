import { Injectable } from '@angular/core';
import { FormControl, ValidatorFn } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ValidationService {
  public passwordValidator(
    control: FormControl,
  ): { [key: string]: boolean } | null {
    const upperCaseCharacters = /[A-Z]+/g;
    const lowerCaseCharacters = /[a-z]+/g;
    const numberCharacters = /[0-9]+/g;
    const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (!upperCaseCharacters.test(control.value)) {
      return { uppercase: false };
    }
    if (!lowerCaseCharacters.test(control.value)) {
      return { lowercase: false };
    }
    if (!numberCharacters.test(control.value)) {
      return { number: false };
    }
    if (!specialCharacters.test(control.value)) {
      return { specialChar: false };
    }
    if (control.value.length < 8) {
      return { length: false };
    }
    return null;
  }

  public addValidation(
    controlsArr: FormControl[],
    validatorsArr: ValidatorFn[],
  ) {
    controlsArr.forEach((control) => {
      control.setValidators(validatorsArr);
      control.updateValueAndValidity();
    });
  }

  public removeValidation(controlsArr: FormControl[]) {
    controlsArr.forEach((control) => {
      control.setValidators([]);
      control.updateValueAndValidity();
    });
  }
}
