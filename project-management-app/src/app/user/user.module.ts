import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { EditUserRoutingModule } from './user-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [EditUserComponent],
  imports: [
    CommonModule,
    SharedModule,
    EditUserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class EditUserModule {}
