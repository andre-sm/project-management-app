import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { ValidationService } from '../../services/validation.service';
import * as fromApp from '../../../store/app.reducer';
import * as AuthActions from '../../store/auth.actions';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLoginMode: boolean = false;

  authForm: FormGroup = new FormGroup({
    firstName: new FormControl(null),
    lastName: new FormControl(null),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      this.validationService.passwordValidator.bind(this),
    ]),
  });

  namesValidators: ValidatorFn[] = [
    Validators.required,
    Validators.minLength(3),
  ];

  validationPassword = {
    noUppercase: false,
    noLowercase: false,
    noNumber: false,
    noCharacter: false,
    noLength: false,
  };

  constructor(
    private validationService: ValidationService,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>,
    private location: Location
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.routeConfig?.path === 'login') {
      this.isLoginMode = true;
    } else {
      this.isLoginMode = false;
      this.validationService.addValidation(
        [
          this.authForm.controls['firstName'] as FormControl,
          this.authForm.controls['lastName'] as FormControl,
        ],
        this.namesValidators,
      );
    }
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
    this.authForm.reset();
    for (const control in this.authForm.controls) {
      this.authForm.controls[control].markAsUntouched();
    }
    if (!this.isLoginMode) {
      this.validationService.addValidation(
        [
          this.authForm.controls['firstName'] as FormControl,
          this.authForm.controls['lastName'] as FormControl,
        ],
        this.namesValidators,
      );
      this.location.replaceState('/auth/signup')
    } else {
      this.validationService.removeValidation([
        this.authForm.controls['firstName'] as FormControl,
        this.authForm.controls['lastName'] as FormControl,
      ]);
      this.location.replaceState('/auth/login')
    }
  }

  onSubmit() {
    if (!this.authForm.valid) return;
    const name = `${this.authForm.value.firstName} ${this.authForm.value.lastName}`;
    const login = this.authForm.value.email;
    const { password } = this.authForm.value;
    if (this.isLoginMode) {
      this.authForm.reset();
      for (const control in this.authForm.controls) {
        this.authForm.controls[control].markAsUntouched();
      }
      this.store.dispatch(new AuthActions.LoginStart({ login, password }));
    } else {
      this.authForm.reset();
      for (const control in this.authForm.controls) {
        this.authForm.controls[control].markAsUntouched();
      }
      this.store.dispatch(
        new AuthActions.SignupStart({ name, login, password }),
      );
    }
  }

  hasError(controlName: string, errorName: string) {
    return this.authForm.controls[controlName].hasError(errorName);
  }

  passwordHasErrors() {
    if (
      this.authForm.controls['password'].errors &&
      this.authForm.controls['password'].errors['uppercase'] === false
    ) {
      return 'uppercase';
    }
    if (
      this.authForm.controls['password'].errors &&
      this.authForm.controls['password'].errors['lowercase'] === false
    ) {
      return 'lowercase';
    }
    if (
      this.authForm.controls['password'].errors &&
      this.authForm.controls['password'].errors['number'] === false
    ) {
      return 'number';
    }
    if (
      this.authForm.controls['password'].errors &&
      this.authForm.controls['password'].errors['specialChar'] === false
    ) {
      return 'specialChar';
    }
    if (
      this.authForm.controls['password'].errors &&
      this.authForm.controls['password'].errors['length'] === false
    ) {
      return 'length';
    }
    return null;
  }
}
