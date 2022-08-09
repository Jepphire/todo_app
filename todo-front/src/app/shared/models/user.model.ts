import * as moment from 'moment';

export class User {
  constructor(
    public id: string,
    private _token: string,
    private _tokenExp: moment.Moment
  ) {}

  get token() {
    if (!this._tokenExp || moment().isAfter(this._tokenExp)) {
      return null;
    }
    else return this._token;
  }
}
