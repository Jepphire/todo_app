import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'todo-front';
  showSidenav: boolean = false;
  @ViewChild('SidebarComponent') sidebar: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.autoSignIn();
  }

  toggleSidenav() {
    this.showSidenav = !this.showSidenav;
  }

}
