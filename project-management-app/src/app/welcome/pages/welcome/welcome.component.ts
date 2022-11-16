import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { selectUser } from 'src/app/store/selectors/auth.selector';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent {
  isAuthenticated: boolean = false;

  constructor(private router: Router, private store: Store) {
    this.store
      .select(selectUser)
      .pipe(
        tap((user) => {
          this.isAuthenticated = !!user;
        }),
      )
      .subscribe();
  }

  onLogin() {
    this.router.navigate(['/auth/login']);
  }

  onSignup() {
    this.router.navigate(['/auth/signup']);
  }
}
