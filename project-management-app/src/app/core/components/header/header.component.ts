import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { selectIsAuthenticated } from '../../../store/selectors/auth.selector';
import * as AuthActions from '../../../auth/store/auth.actions';
import { TaskFormComponent } from '../../../project-board/components/task-form/task-form.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isAuthenticated$!: Observable<boolean>;

  constructor(
    private store: Store,
    private router: Router,
    public dialog: MatDialog,
  ) {
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
  }

  onLogin() {
    this.router.navigate(['/auth/login']);
  }

  onSignup() {
    this.router.navigate(['/auth/signup']);
  }

  onLogout() {
    this.store.dispatch(AuthActions.logout());
  }

  onEditUser() {
    this.router.navigate(['/edit-user']);
  }

  openCreateTaskDialog(): void {
    const createDialogConfig = new MatDialogConfig();
    createDialogConfig.disableClose = true;
    createDialogConfig.autoFocus = true;
    createDialogConfig.data = {
      formTitle: 'Create task',
      confirmText: 'Create',
      cancelText: 'Close',
      id: null,
    };

    this.dialog.open(TaskFormComponent, createDialogConfig);
  }
}
