import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  isLoginMode: boolean = false;
  authForm: FormGroup = new FormGroup({
    'firstName': new FormControl(null),
    'lastName': new FormControl(null),
    'email': new FormControl(null),
    'password': new FormControl(null),

  })

  constructor(){}

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
    this.authForm.reset();
  }
  onSubmit(){
    console.log(this.authForm)
  }
}
