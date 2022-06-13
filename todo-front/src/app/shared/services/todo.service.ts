import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class TodoService {

  refreshList = new Subject();

  constructor(
    private http: HttpClient
  ) {}

  getAllLists(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/todo_lists')
  }

  getListById(id: number | string): Observable<any> {
    return this.http.get('http://localhost:3000/todo_lists/' + id)
  }

  getListItems(id: number | string): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/todo_items/items/' + id)
  }

  createList(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/todo_lists', data)
  }

  updateList(data: any, id: number | string) {
    return this.http.put('http://localhost:3000/todo_lists/' + id, data)
  }

  destroyList(id: number | string) {
    return this.http.delete('http://localhost:3000/todo_lists/' + id)
  }

  createItem(data: any) {
    return this.http.post('http://localhost:3000/todo_items', data)
  }

  destroyItem(id: number | string) {
    return this.http.delete('http://localhost:3000/todo_items/' + id)
  }

}
