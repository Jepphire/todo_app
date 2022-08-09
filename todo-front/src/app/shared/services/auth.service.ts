import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import * as moment from 'moment';

import { User } from "../models/user.model";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  user = new Subject<User>();

  constructor(
    private http: HttpClient
  ) {}

  signUp(data: any) {
    return this.http.post('http://localhost:3000/users', data).pipe(
      catchError(errorRes => {
        let message = 'An unknown error has ocurred';
        if (!errorRes.error || !errorRes.error.error) {
          return throwError(message);
        }
        switch (errorRes.error.errors[0]) {
          case 'Email is invalid': message = 'Email is invalid'; break;
          case 'Email has already been taken': message = 'This email is already in use';
        }
        return throwError(message);
      })
    )
  }

  signIn(data: any) {
    return this.http.post('http://localhost:3000/auth/login', data).pipe(
      catchError(errorRes => {
        let message = 'An unknown error has ocurred';
        if (!errorRes.error || !errorRes.error.error) {
          return throwError(message);
        }
        switch (errorRes.error.error) {
          case 'unauthorized': message = 'Incorrect email/password';
        }
        return throwError(message);
      }),
      tap(resData => {this.setSession(resData)})
    )
  }

  signOut() {
    // localStorage.removeItem("user_token");
    // localStorage.removeItem("token_exp");
    this.user.next()
  }

  public isLoggedIn() {
    return moment().isBefore(this.getTokenExp())
  }

  public isLoggedOut() {
    return !this.isLoggedIn();
  }

  private setSession(authResponse: any) {
    // localStorage.setItem('user_token', authResponse.token);
    // localStorage.setItem('token_exp', JSON.stringify(moment().add(14, 'days')).valueOf())
    const user = new User(
      authResponse.id,
      authResponse.token,
      authResponse.exp
    );
    this.user.next(user);
  }

  getTokenExp() {
    const token_exp = localStorage.getItem("token_exp")
    if (token_exp) {
      const expiration = JSON.parse(token_exp)
      return moment(expiration)
    }
    else return null
  }

}
