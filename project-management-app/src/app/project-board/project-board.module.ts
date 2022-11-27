import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { SharedModule } from '../shared/shared.module';
import { ProjectBoardRoutingModule } from './project-board-routing.module';
import { ProjectBoardComponent } from './pages/project-board/project-board.component';
import { ColumnFormComponent } from './components/column-form/column-form.component';
import { BoardEffects } from './store/board.effects';
import * as fromBoard from './store/board.reducer';
import { ColumnComponent } from './components/column/column.component';
import { TaskComponent } from './components/task/task.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { BoardActionsComponent } from './components/board-actions/board-actions.component';
import { FilterComponent } from './components/filter/filter.component';

@NgModule({
  declarations: [
    ProjectBoardComponent,
    ColumnFormComponent,
    ColumnComponent,
    TaskComponent,
    TaskFormComponent,
    BoardActionsComponent,
    FilterComponent,
  ],
  imports: [
    CommonModule,
    ProjectBoardRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature(fromBoard.featureName, fromBoard.projectsReducer),
    EffectsModule.forFeature([BoardEffects]),
    NgScrollbarModule
  ],
})
export class ProjectBoardModule {}
