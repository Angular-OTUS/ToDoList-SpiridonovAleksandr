import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ToDo } from '../model/to-do';

@Injectable({
  providedIn: 'root'
})
export class ToDoEventService {
  private statusChangedSource = new Subject<ToDo>();
  public statusChanged$ = this.statusChangedSource.asObservable();

  public statusChanged(event: ToDo) {
    this.statusChangedSource.next(event);
  }
}
