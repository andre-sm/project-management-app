import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/shared/services/validation.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  editForm: FormGroup = new FormGroup({
    firstName: new FormControl(null),
    lastName: new FormControl(null),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      this.validationService.passwordValidator.bind(this),
    ]),
  })

  constructor(private validationService: ValidationService) { }

  ngOnInit(): void {
  }

  onSaveChanges(){}
  hasError(controlName: string, errorName: string){ return true}

  onDeleteUser(){}
}
