import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthWelcomeGuard } from '../auth/guards/auth-welcome.guard';
import { WelcomeComponent } from './pages/welcome/welcome.component';

const routes: Routes = [{ path: '',  component: WelcomeComponent, canActivate: [AuthWelcomeGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WelcomeRoutingModule {}
