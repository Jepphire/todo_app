import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class TodoService {

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

  createList(data: any) {
    return this.http.post('http://localhost:3000/todo_lists', {data})
  }

}
