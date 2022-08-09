import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators'

import { AuthComponent } from '../auth/auth.component';

import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSidenav = new EventEmitter<any>();
  routeParamsSub: Subscription

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    public dialog: MatDialog
  ) {
    this.routeParamsSub = this.route.queryParams.subscribe(params => {
      if (params['auth']) {
        this.openAuthDialog(params['auth'])
      }
    })
  }

  ngOnInit(): void {
  }

  onToggleSidenav() {
    this.toggleSidenav.emit()
  }

  openAuthDialog(params: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {auth: params};

    const dialogRef = this.dialog.open(AuthComponent, dialogConfig);

    // dialogRef.afterClosed().subscribe(data => {
    //   if (data.auth == 'sign_in') {
    //     this.authService.signIn(data);
    //   }
    //   else if (data.auth == 'sign_up') {
    //     const authData = {
    //       user: {
    //         email: data.email,
    //         password: data.password
    //       }
    //     };
    //     this.authService.createUser(authData);
    //   }
    // })
  }

  onSignOut() {
    this.authService.signOut();
  }

}
