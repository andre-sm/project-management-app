import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ActionPanelComponent } from './components/action-panel/action-panel.component';
import { SearchComponent } from './components/action-panel/search/search.component';
import { ProjectFormComponent } from './components/action-panel/project-form/project-form.component';
import { projectsReducer } from './store/reducers/projects.reducer';
import { ProjectsEffects } from './store/effects/projects.effects';

@NgModule({
  declarations: [
    ProjectsComponent,
    ActionPanelComponent,
    SearchComponent,
    ProjectFormComponent,
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('projectsFeature', {
      projects: projectsReducer,
    }),
    EffectsModule.forFeature([ProjectsEffects]),
  ],
})
export class ProjectsModule {}
