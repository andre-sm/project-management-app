import { Project } from '../../models/project.model';

export interface ProjectsState {
  projects: Project[];
  error: string | null;
}
