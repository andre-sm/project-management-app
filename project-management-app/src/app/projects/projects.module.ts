import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ActionPanelComponent } from './components/action-panel/action-panel.component';
import { SearchComponent } from './components/action-panel/search/search.component';
import { ProjectFormComponent } from './components/action-panel/project-form/project-form.component';

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
  ],
})
export class ProjectsModule {}
