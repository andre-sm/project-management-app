import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthMainGuard } from '../auth/guards/auth-main.guard';
import { EditUserComponent } from './components/edit-user/edit-user.component';

const routes = [
  {
    path: '',
    component: EditUserComponent,
    canActivate: [AuthMainGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditUserRoutingModule {}
