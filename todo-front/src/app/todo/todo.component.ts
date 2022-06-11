import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from '../shared/services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  routeParams: any = null;
  list: any;
  listItems: any[] = [];
  edit: boolean = false;
  todoEditForm: any;

  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.routeParams = params;
      this.todoService.getListById(this.routeParams['id']).subscribe(data => {
        this.list = data
      });
      this.todoService.getListItems(this.routeParams['id']).subscribe(data => {
        this.listItems = data
      });
    });
    // this.todoService.getListById(this.routeParams['id']).subscribe(data => {
    //   this.list = data
    // });
    // this.todoService.getListItems(this.routeParams['id']).subscribe(data => {
    //   this.listItems = data
    // });
  }

  onEdit() {
    this.router.navigate([], {relativeTo: this.route, queryParams: {edit: 'true'}});
    this.edit = true;
    this.todoEditForm = new FormGroup({
      'title': new FormControl(this.list.title),
      'description': new FormControl(this.list.description)
    });
  }

  onSaveEdit(formData: any) {
    this.todoService.updateList(formData.value, this.routeParams['id']).subscribe(() => {
      this.router.navigate(['/todo/' + this.routeParams['id']]);
      this.list = formData.value;
      this.todoService.refreshList.next();
      this.edit = false;
    })
  }

  onCancelEdit() {
    this.todoEditForm.reset();
    this.router.navigate(['/todo/' + this.routeParams['id']]);
    this.edit = false;
  }

  onDelete(id: number) {
    this.todoService.destroyList(id).subscribe(() => {
      this.router.navigate(['/']);
      this.todoService.refreshList.next();
    });
  }

}
