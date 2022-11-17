import { Project, User } from '../../models';

export interface ProjectsState {
  isLoading: boolean;
  projects: Project[];
  error: string | null;
  users: User[];
}
