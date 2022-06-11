import { Component, EventEmitter, OnInit, OnDestroy, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { TodoService } from '../shared/services/todo.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  @Output() toggleSidenav = new EventEmitter<any>()

  todoLists: any[] = []
  refreshListSub = new Subscription

  constructor(
    private todoService: TodoService,
  ) { }

  ngOnInit(): void {
    this.showLists();
    this.refreshListSub = this.todoService.refreshList.subscribe(() => {
      this.showLists();
    });
  }

  onToggleSidenav() {
    this.toggleSidenav.emit();
  }

  onDeleteList(id: number) {
    this.todoService.destroyList(id).subscribe(() => {
      this.showLists();
    });
  }

  showLists() {
    this.todoService.getAllLists().subscribe(data => {
      this.todoLists = data;
    });
  }

  ngOnDestroy(): void {
      this.refreshListSub.unsubscribe();
  }

}
