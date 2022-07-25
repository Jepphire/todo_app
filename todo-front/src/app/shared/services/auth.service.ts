import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    private http: HttpClient
  ) {}

  createUser(data: any) {
    return this.http.post('http://localhost:3000/users', data).subscribe()
  }

  signIn(data: any) {
    return this.http.post('http://localhost:3000/auth/login', data).subscribe(
      resData => this.setSession(resData)
    )
  }

  signOut() {
    localStorage.removeItem("user_token")
  }

  private setSession(authResponse: any) {
    localStorage.setItem('user_token', authResponse.token);
    localStorage.setItem('token_exp', JSON.stringify(moment().add(14, 'days').format()))
    // console.log(moment().add(14, 'days').format())
  }

}
