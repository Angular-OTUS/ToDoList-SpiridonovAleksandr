import { Component, inject, Signal } from '@angular/core';
import { Toast } from './components/shared/toast/toast';
import { RouterOutlet } from '@angular/router';
import { Navigation } from './components/shared/navigation/navigation';
import { Language, TranslateService } from '@ngx-translate/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { LANGUAGES } from './tokens/languages.token';

@Component({
  selector: 'app-root',
  imports: [Toast, RouterOutlet, Navigation],
  providers: [
    {
      provide: LANGUAGES,
      useValue: ['en', 'ru']
    }
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly translate = inject(TranslateService);
  private readonly languages: Language[] = inject(LANGUAGES);
  protected readonly title: Signal<string> = toSignal(
    this.translate.stream('app.title'),
    { initialValue: 'TasksBoard' }
  );

  constructor() {
    this.translate.addLangs(this.languages);
    this.translate.use('en');
  }
}
