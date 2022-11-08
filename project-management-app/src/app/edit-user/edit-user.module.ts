import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { EditUserRoutingModule } from './edit-user-routing.module';



@NgModule({
  declarations: [
    EditUserComponent
  ],
  imports: [
    CommonModule,
    EditUserRoutingModule
  ]
})
export class EditUserModule { }
