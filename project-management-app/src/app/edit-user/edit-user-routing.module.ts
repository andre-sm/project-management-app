import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard';
import { EditUserComponent } from './components/edit-user/edit-user.component';

const routes = [
  {path: '', component: EditUserComponent, canActivate: [AuthGuard] }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditUserRoutingModule {}
