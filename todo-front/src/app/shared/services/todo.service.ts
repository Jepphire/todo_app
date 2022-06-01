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

}
