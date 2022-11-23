export interface ProjectRender {
  _id: string;
  title: string;
  description: string;
  owner: string;
  ownerData: {
    name: string;
    color: string;
  };
  users: Array<string>;
  tasks: number;
}
