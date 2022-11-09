export interface IUser {
  login: string;
  token: string;
  userId: string;
  name: string;
  tokenExpirationDate: Date;
}

export class User {
  public token: string;

  public userId: string;

  public login: string;

  public name: string;

  public tokenExpirationDate: Date;

  constructor(userObj: IUser) {
    this.login = userObj.login;
    this.token = userObj.token;
    this.userId = userObj.userId;
    this.name = userObj.name;
    this.tokenExpirationDate = userObj.tokenExpirationDate;
  }
}
