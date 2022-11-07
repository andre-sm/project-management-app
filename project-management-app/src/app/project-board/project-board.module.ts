import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ProjectBoardRoutingModule } from './project-board-routing.module';
import { ProjectBoardComponent } from './pages/project-board/project-board.component';

@NgModule({
  declarations: [ProjectBoardComponent],
  imports: [CommonModule, ProjectBoardRoutingModule, SharedModule],
})
export class ProjectBoardModule {}
