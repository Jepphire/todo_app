import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ErrorHandlingService {

  errorArr = new BehaviorSubject<any[]>([])

  constructor() {}

  handleUserError(errorRes: any) {
    this.errorArr.next(errorRes.error.errors)
  }

  handleAuthError(errorRes: any) {
    this.errorArr.next(errorRes.error.errors)
  }

}
