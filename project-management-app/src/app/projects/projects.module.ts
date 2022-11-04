import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ActionPanelComponent } from './components/action-panel/action-panel.component';
import { SearchComponent } from './components/action-panel/search/search.component';
import { ProjectFormComponent } from './components/action-panel/project-form/project-form.component';
import * as fromProjects from './store/reducers/projects.reducer';
import { ProjectsEffects } from './store/effects/projects.effects';
import { ProjectsListComponent } from './components/project-list/projects-list.component';

@NgModule({
  declarations: [
    ProjectsComponent,
    ActionPanelComponent,
    SearchComponent,
    ProjectFormComponent,
    ProjectsListComponent,
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
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
