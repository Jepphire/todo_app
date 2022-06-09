import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { TodoService } from '../shared/services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  routeParams: any = null
  list: any;
  listItems: any[] = []

  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.todoService.getListById(params['id']).subscribe(data => {
        this.list = data
      });
      this.todoService.getListItems(params['id']).subscribe(data => {
        this.listItems = data
      });
    })
  }

}
