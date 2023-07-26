export interface Project {
  _id: string;
  title: string;
  description: string;
  owner: string;
  users: Array<string>;
}
