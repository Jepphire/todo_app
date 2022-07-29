import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'todo-front';
  showSidenav: boolean = false;
  @ViewChild('SidebarComponent') sidebar: any;

  constructor() {}

  ngOnInit(): void {}

  toggleSidenav() {
    this.showSidenav = !this.showSidenav;
  }

}
