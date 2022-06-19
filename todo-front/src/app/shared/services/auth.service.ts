import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  signUp: boolean = false;
  signIn: boolean = false;

}
