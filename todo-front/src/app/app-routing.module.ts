import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { TodoComponent } from './todo/todo.component';

const routes: Routes = [
  { path: '*', redirectTo: '' },
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'todo/:id', pathMatch: 'full', component: TodoComponent },
  { path: 'todos/new', pathMatch: 'full', component: TodoFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
