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

  todoLists: any[] = [];
  authenticated: boolean = false;
  userId: number;
  private refreshListSub: Subscription;
  private userSub: Subscription;

  constructor(
    private todoService: TodoService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.authenticated = !!user;
      if (user) {
        this.userId = user.id;
        this.fetchLists(user.id);
      }
    });
    this.refreshListSub = this.todoService.refreshList.subscribe(() => {
      this.fetchLists(this.userId);
    });
  }

  onToggleSidenav() {
    this.toggleSidenav.emit();
  }

  onDeleteList(id: number) {
    this.todoService.destroyList(id).subscribe(() => {
      this.fetchLists(this.userId);
    });
  }

  fetchLists(id: number) {
    if (this.authenticated) {
      this.todoService.getListsByUser(id).subscribe(data => {
        this.todoLists = data;
      });
    }
  }

  ngOnDestroy(): void {
      this.refreshListSub.unsubscribe();
      this.userSub.unsubscribe()
  }

}
