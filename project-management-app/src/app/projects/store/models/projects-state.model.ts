import { Project } from '../../models/project.model';

export interface ProjectsState {
  isLoading: boolean;
  projects: Project[];
  error: string | null;
}
