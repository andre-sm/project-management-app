import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ActionPanelComponent } from './components/action-panel/action-panel.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectFormComponent } from './components/project-form/project-form.component';
import { ProjectsEffects } from './store/projects.effects';
import { ProjectsListComponent } from './components/projects-list/projects-list.component';
import * as fromProjects from './store/projects.reducer';

@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectFormComponent,
    ProjectsListComponent,
    ActionPanelComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProjectsRoutingModule,
    MatSortModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature(
      fromProjects.featureName,
      fromProjects.projectsReducer,
    ),
    EffectsModule.forFeature([ProjectsEffects]),
  ],
})
export class ProjectsModule {}
