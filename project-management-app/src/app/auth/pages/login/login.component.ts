import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { Location } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { ShowAlertService } from '../../../shared/services/show-alert.service';
import { selectAuthState } from '../../../store/selectors/auth.selector';
import * as AuthActions from '../../store/auth.actions';
import { ValidationService } from '../../../shared/services/validation.service';
import { AuthState } from '../../store/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private authSub: Subscription | undefined;

  isLoginMode: boolean = false;

  hidePassword: boolean = true;

  isLoading: boolean = false;

  error: string | null = null;

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

  auth$!: Observable<AuthState>;

  constructor(
    protected validationService: ValidationService,
    private route: ActivatedRoute,
    private store: Store,
    private location: Location,
    private showAlertService: ShowAlertService,
  ) {
    this.auth$ = this.store.select(selectAuthState);
  }

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
    this.authSub = this.auth$.subscribe((authState) => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
      if (this.error) {
        this.showErrorAlert(this.error);
      }
    });
  }

  ngOnDestroy() {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
    this.authForm.reset();
    if (!this.isLoginMode) {
      this.validationService.addValidation(
        [
          this.authForm.controls['firstName'] as FormControl,
          this.authForm.controls['lastName'] as FormControl,
        ],
        this.namesValidators,
      );
      this.location.replaceState('/auth/signup');
    } else {
      this.validationService.removeValidation([
        this.authForm.controls['firstName'] as FormControl,
        this.authForm.controls['lastName'] as FormControl,
      ]);
      this.location.replaceState('/auth/login');
    }
  }

  onSubmit() {
    if (!this.authForm.valid) return;
    const name = `${this.authForm.value.firstName} ${this.authForm.value.lastName}`;
    const login = this.authForm.value.email;
    const { password } = this.authForm.value;
    if (this.isLoginMode) {
      this.authForm.reset();
      this.store.dispatch(AuthActions.loginStart({ login, password }));
    } else {
      this.authForm.reset();
      this.store.dispatch(AuthActions.signupStart({ name, login, password }));
    }
  }

  onHandleError() {
    this.store.dispatch(AuthActions.clearError());
  }

  private showErrorAlert(message: string) {
    this.showAlertService.showAlert(message);
  }
}
