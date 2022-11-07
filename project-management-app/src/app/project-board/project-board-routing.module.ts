import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ProjectBoardComponent } from './pages/project-board/project-board.component';

const routes: Routes = [
  {
    path: 'projects/board/:id',
    component: ProjectBoardComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectBoardRoutingModule {}
