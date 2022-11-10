import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ShowAlertService } from 'src/app/shared/services/show-alert.service';
import { AuthState } from '../../../auth/store/models';
import { IUser } from '../../../shared/models/user.model';
import { ValidationService } from '../../../shared/services/validation.service';
import { selectAuthState } from '../../../store/selectors/auth.selector';
import * as EditActions from '../../store/edit-user.actions'
import * as AuthActions from '../../../auth/store/auth.actions';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit, OnDestroy {
  currentUser: IUser = {
    login: '',
    token: '',
    tokenExpirationDate: new Date(),
    name: '',
    userId: '',
  };

  authSub: Subscription | undefined;

  editForm: FormGroup = new FormGroup({});

  hidePassword = true;

  auth$!: Observable<AuthState>;

  error: string | null = null;

  constructor(
    protected validationService: ValidationService,
    private store: Store,
    private showAlertService: ShowAlertService,
  ) {
    this.auth$ = this.store.select(selectAuthState);
  }

  ngOnInit(): void {
    this.authSub = this.auth$.subscribe((authState) => {
      this.currentUser.login = authState.user?.login as string;
      this.currentUser.name = authState.user?.name as string;
      this.currentUser.userId = authState.user?.userId as string;
      this.error = authState.errorMessage;
      console.log(authState.errorMessage)
      if (this.error) {
        this.showErrorAlert(this.error);
      }
    });

    this.editForm = new FormGroup({
      firstName: new FormControl(this.currentUser.name.split(' ')[0], [
        Validators.required,
        Validators.minLength(3),
      ]),
      lastName: new FormControl(this.currentUser.name.split(' ')[1], [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl(this.currentUser.login, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl(null, [
        Validators.required,
        this.validationService.passwordValidator.bind(this),
      ]),
    });
  }

  ngOnDestroy(): void {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }

  onSaveChanges() {
    const name: string = `${this.editForm.value.firstName} ${this.editForm.value.lastName}`;
    const login: string = this.editForm.value.email;
    const password: string = this.editForm.value.password;
    const userId: string = this.currentUser.userId;
    this.store.dispatch(EditActions.editUserStart({name, login, password, userId}))
  }

  onHandleError() {
    this.store.dispatch(AuthActions.clearError());
  }

  private showErrorAlert(message: string) {
    this.showAlertService.showAlert(message);
  }

  onDeleteUser() {}
}
