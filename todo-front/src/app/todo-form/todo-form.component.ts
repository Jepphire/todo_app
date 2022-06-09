import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TodoService } from '../shared/services/todo.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {

  todoForm = new FormGroup({
    'title': new FormControl(null),
    'description': new FormControl(null)
  })

  constructor(
    private todoService: TodoService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(formData: any) {
    this.todoService.createList(formData.value).subscribe(() => {
      this.router.navigate(['/'])
    })
  }

}
