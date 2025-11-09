import { Component, signal } from '@angular/core';
import { Toast } from './components/shared/toast/toast';
import { RouterOutlet } from '@angular/router';
import { Navigation } from './components/shared/navigation/navigation';

@Component({
  selector: 'app-root',
  imports: [Toast, RouterOutlet, Navigation],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('TasksBoard');
}
