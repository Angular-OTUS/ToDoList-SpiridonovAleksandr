import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToDo, ToDoDto, ToDos } from '../model/to-do';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToDoListApiService {
  private http: HttpClient = inject(HttpClient);
  private path = '/todos';

  public getAll(): Observable<ToDos> {
    return this.http.get<ToDo[]>(this.path).pipe(
      map(items => ({ items })),
    );
  }

  public add(toDoDto: ToDoDto): Observable<ToDo> {
    return this.http.post<ToDo>(this.path, toDoDto);
  }

  public update(toDo: ToDo): Observable<ToDo> {
    return this.http.put<ToDo>(this.path, toDo);
  }

  public removeById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.path}/${id}`);
  }
}
