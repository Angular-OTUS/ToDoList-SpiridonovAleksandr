import { Component, signal } from '@angular/core';
import { ToDoList } from './components/to-do-list/to-do-list';

@Component({
  selector: 'app-root',
  imports: [ToDoList],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ToDoList-SpiridonovAleksandr');
}
