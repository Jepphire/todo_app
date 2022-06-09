import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TodoService } from '../shared/services/todo.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Output() toggleSidenav = new EventEmitter<any>()
  todoLists: any[] = []

  constructor(
    private TodoService: TodoService
  ) { }

  ngOnInit(): void {
    this.showLists()
  }

  onToggleSidenav() {
    this.toggleSidenav.emit()
  }

  showLists() {
    this.TodoService.getAllLists().subscribe(data => {
      this.todoLists = data;
    })
  }

}
