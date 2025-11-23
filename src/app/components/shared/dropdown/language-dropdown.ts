import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Language, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-dropdown',
  imports: [
    FormsModule
  ],
  templateUrl: './language-dropdown.html',
  styleUrl: './language-dropdown.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguageDropdown {
  private readonly translate = inject(TranslateService);
  protected languages = signal<readonly Language[]>(this.translate.getLangs());
  protected currentLang = signal<Language>(this.translate.getCurrentLang());

  protected switchTo(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const lang = selectElement.value;
    this.translate.use(lang);
    this.currentLang.set(lang);
  }
}
