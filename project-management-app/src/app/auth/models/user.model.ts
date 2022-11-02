export interface IUser {
  login: string;
  token: string;
}

export class User {
  public login: string;
  private _token: string;

  constructor(userObj: IUser) {
    this.login = userObj.login;
    this._token = userObj.token;
  }

  public getUserToken(){
    return this._token
  }
}
