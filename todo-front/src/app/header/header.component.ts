import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthComponent } from '../auth/auth.component';

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

    dialogRef.afterClosed().subscribe(data => {
      console.log(data)
    })
  }

}
