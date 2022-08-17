import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, ReplaySubject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import * as moment from 'moment';

import { User } from "../models/user.model";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  user = new BehaviorSubject<User | null>(null)

  constructor(
    private http: HttpClient
  ) {}

  signUp(data: any) {
    return this.http.post('http://localhost:3000/users', data)
  }

  signIn(data: any) {
    return this.http.post('http://localhost:3000/auth/login', data).pipe(
      tap(resData => {this.setSession(resData)})
    )
  }

  autoSignIn() {
    const userString = localStorage.getItem('current_user')
    if (userString) {
      const userObj = JSON.parse(userString);
      const user = new User(
        userObj.id,
        userObj._token,
        userObj._tokenExp
      );
      (user.token ? this.user.next(user) : this.signOut)
    }
  }

  signOut() {
    this.user.next(null);
    localStorage.removeItem('current_user');
  }

  private setSession(userData: any) {
    const user = new User(
      userData.id,
      userData.token,
      userData.exp
    );
    this.user.next(user);
    localStorage.setItem('current_user', JSON.stringify(user));
  }

}
