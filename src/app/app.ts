import { Component, signal } from '@angular/core';
import { Toast } from './components/shared/toast/toast';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [Toast, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('ToDoList-SpiridonovAleksandr');
}
