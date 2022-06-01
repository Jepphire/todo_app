import { Component, OnInit } from '@angular/core';

import { TodoService } from 'src/app/shared/services/todo.service';

@Component({
  selector: 'app-list-nav',
  templateUrl: './list-nav.component.html',
  styleUrls: ['./list-nav.component.css']
})
export class ListNavComponent implements OnInit {

  todoLists: any[] = []

  constructor(
    private TodoService: TodoService
  ) { }

  ngOnInit(): void {
    this.showLists()
  }

  showLists() {
    this.TodoService.getAllLists().subscribe(data => {
      this.todoLists = data;
    })
  }

}
