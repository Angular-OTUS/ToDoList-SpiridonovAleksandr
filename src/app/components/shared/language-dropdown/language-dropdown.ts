import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Language, TranslateService } from '@ngx-translate/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, startWith } from 'rxjs';

@Component({
  selector: 'app-language-dropdown',
  imports: [
    FormsModule,
  ],
  templateUrl: './language-dropdown.html',
  styleUrl: './language-dropdown.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageDropdown {
  private readonly translate = inject(TranslateService);
  protected languages = signal<readonly Language[]>(this.translate.getLangs());
  protected currentLang = toSignal(
    this.translate.onLangChange.pipe(
      map(event => event.lang),
      startWith(this.translate.getCurrentLang()),
    ),
    { initialValue: 'en' },
  );

  protected switchTo(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const lang = selectElement.value;
    this.translate.use(lang);
  }
}
