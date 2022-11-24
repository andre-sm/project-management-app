import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthMainGuard } from '../auth/guards/auth-main.guard';
import { ProjectBoardGuard } from './guards/project-board.guard';
import { ProjectBoardComponent } from './pages/project-board/project-board.component';

const routes: Routes = [
  {
    path: ':id',
    component: ProjectBoardComponent,
    canActivate: [AuthMainGuard, ProjectBoardGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectBoardRoutingModule {}
