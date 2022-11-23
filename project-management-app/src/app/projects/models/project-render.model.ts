export interface ProjectRender {
  _id: string;
  title: string;
  description: string;
  owner: string;
  users: Array<string>;
  tasks: number;
}
