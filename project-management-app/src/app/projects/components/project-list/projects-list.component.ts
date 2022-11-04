import { Component, Input } from '@angular/core';
import { Project } from '../../models';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss'],
})
export class ProjectsListComponent {
  displayedColumns = ['title', 'description', 'actions'];

  @Input() projects!: Project[];
}
