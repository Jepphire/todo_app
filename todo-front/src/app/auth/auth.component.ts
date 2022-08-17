import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../shared/services/auth.service';
import { ErrorHandlingService } from '../shared/services/error-handling.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  signUp: boolean = false;
  signIn: boolean = false;
  authType: string;
  errors: any[] = [];
  //error: string;

  authForm = new FormGroup({
    'email': new FormControl(null),
    'password': new FormControl(null),
    'password_confirmation': new FormControl(null)
  });

  private errorSub: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<AuthComponent>,
    private authService: AuthService,
    private errorService: ErrorHandlingService,
    @Inject(MAT_DIALOG_DATA) dialogData: any
  ) {
    this.authType = dialogData.auth;
    if (dialogData.auth == 'sign_up') {this.signUp = true}
    else if (dialogData.auth == 'sign_in') {this.signIn = true};
  }

  ngOnInit(): void {
    this.errorSub = this.errorService.errorArr.subscribe(errorArr => {
      this.errors = errorArr;
    })
  }

  submitDialog(formData: any) {
    if (!formData.valid) return
    if (this.authType == 'sign_up') {
      this.onSignUp(formData.value)
    } else if (this.authType == 'sign_in') {
      this.onSignIn(formData.value)
    }
    // let mergedData = {...formData.value, auth: this.authType}
    // this.dialogRef.close(mergedData);
    // this.router.navigate([], {relativeTo: this.route});
    // this.signUp = false;
    // this.signIn = false;
  }

  closeDialog() {
    this.dialogRef.close();
    this.router.navigate([], {relativeTo: this.route});

    // this.signUp = false;
    // this.signIn = false;
  }

  onSignUp(formData: any) {
    this.authService.signUp({ user: formData}).subscribe(
      () => {this.closeDialog()}, errorRes => {
        this.errorService.handleUserError(errorRes);
      }
    )
  }

  onSignIn(formData: any) {
    this.authService.signIn(formData).subscribe(
      () => {this.closeDialog()}, errorRes => {
        this.errorService.handleAuthError(errorRes)
    })
  }

  ngOnDestroy(): void {
      this.errorSub.unsubscribe()
  }

}
