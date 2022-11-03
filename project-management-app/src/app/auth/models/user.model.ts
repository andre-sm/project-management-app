export interface IUser {
  login: string;
  token: string;
  userId: string;
  name: string;
  tokenExpirationDate: Date;
}

export class User {
  private _token: string;

  private _userId: string;

  public login: string;

  public name: string;

  public tokenExpirationDate: Date;

  constructor(userObj: IUser) {
    this.login = userObj.login;
    this._token = userObj.token;
    this._userId = userObj.userId;
    this.name = userObj.name;
    this.tokenExpirationDate = userObj.tokenExpirationDate;
  }

  public getUserToken() {
    return this._token;
  }

  public getUserId() {
    return this._userId;
  }
}
