import { Component, signal } from '@angular/core';
import { ToDoList } from './components/modules/to-do-list/to-do-list';
import { Toast } from './components/shared/toast/toast';

@Component({
  selector: 'app-root',
  imports: [ToDoList, Toast],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('ToDoList-SpiridonovAleksandr');
}
