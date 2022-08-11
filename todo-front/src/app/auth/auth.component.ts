import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  signUp: boolean = false;
  signIn: boolean = false;
  authType: string;

  authForm = new FormGroup({
    'email': new FormControl(null),
    'password': new FormControl(null),
    'password_confirmation': new FormControl(null)
  })

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<AuthComponent>,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) dialogData: any
  ) {
    this.authType = dialogData.auth;
    if (dialogData.auth == 'sign_up') {this.signUp = true}
    else if (dialogData.auth == 'sign_in') {this.signIn = true};
  }

  ngOnInit(): void {}

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
    this.authService.signUp({ user: formData}).subscribe(() => {this.closeDialog()}, error => {console.log(error)})
  }

  onSignIn(formData: any) {
    this.authService.signIn(formData).subscribe(() => {this.closeDialog()}, error => {console.log(error)})
    // console.log(formData)
    // this.authService.signIn(formData)
  }

}
