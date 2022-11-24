import { Task } from '../../../project-board/models';
import { Project, User } from '../../models';

export interface ProjectsState {
  isLoading: boolean;
  projects: Project[];
  error: string | null;
  users: User[];
  tasks: Task[];
  view: string;
}
