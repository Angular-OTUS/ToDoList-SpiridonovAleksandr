import { Component, inject, Signal, signal } from '@angular/core';
import { Toast } from './components/shared/toast/toast';
import { RouterOutlet } from '@angular/router';
import { Navigation } from './components/shared/navigation/navigation';
import { _, TranslateService } from '@ngx-translate/core';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  imports: [Toast, RouterOutlet, Navigation],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly translate = inject(TranslateService);
  protected readonly title: Signal<string> = toSignal(
    this.translate.get(_('app.title')),
    { initialValue: 'TasksBoard' }
  );

  constructor() {
    this.translate.use('en');
  }
}
