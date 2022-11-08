import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/shared/models/user.model';
import { ValidationService } from 'src/app/shared/services/validation.service';
import { selectAuthState } from 'src/app/store/selectors/auth.selector';

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

  storeSub: Subscription | undefined;

  editForm: FormGroup = new FormGroup({});

  hidePassword = true;

  constructor(
    protected validationService: ValidationService,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.storeSub = this.store
      .select(selectAuthState)
      .subscribe((authState) => {
        this.currentUser.login = authState.user?.login as string;
        this.currentUser.name = authState.user?.name as string;
        this.currentUser.userId = authState.user?.getUserId() as string;
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
    this.storeSub?.unsubscribe();
  }

  onSaveChanges() {
    console.log(this.editForm);
  }

  onDeleteUser() {}
}
