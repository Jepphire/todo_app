import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  currentUser: any;

  constructor(
    private http: HttpClient
  ) {}

  createUser(data: any) {
    return this.http.post('http://localhost:3000/users', data)
    // console.log(data)
  }

}