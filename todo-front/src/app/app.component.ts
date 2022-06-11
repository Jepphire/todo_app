import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'todo-front';
  showSidenav: boolean = false;
  @ViewChild('SidebarComponent') sidebar: any;

  toggleSidenav() {
    this.showSidenav = !this.showSidenav;
  }

}
