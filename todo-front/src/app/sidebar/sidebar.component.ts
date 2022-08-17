import { Component, EventEmitter, OnInit, OnDestroy, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
import { TodoService } from '../shared/services/todo.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  @Output() toggleSidenav = new EventEmitter<any>()

  todoLists: any[] = []
  authenticated: boolean = false
  private refreshListSub: Subscription;
  private userSub: Subscription;

  constructor(
    private todoService: TodoService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.authenticated = !!user;
      this.fetchLists();
    });
    this.refreshListSub = this.todoService.refreshList.subscribe(() => {
      this.fetchLists();
    });
  }

  onToggleSidenav() {
    this.toggleSidenav.emit();
  }

  onDeleteList(id: number) {
    this.todoService.destroyList(id).subscribe(() => {
      this.fetchLists();
    });
  }

  fetchLists() {
    if (this.authenticated) {
      this.todoService.getAllLists().subscribe(data => {
        this.todoLists = data;
      });
    }
  }

  ngOnDestroy(): void {
      this.refreshListSub.unsubscribe();
      this.userSub.unsubscribe()
  }

}
