import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Language, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dropdown',
  imports: [
    FormsModule
  ],
  templateUrl: './language-dropdown.html',
  styleUrl: './language-dropdown.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguageDropdown {
  private readonly translate = inject(TranslateService);
  public languages = input.required<Language[]>();
  protected currentLang = signal<Language>(this.translate.getCurrentLang());

  protected switchTo(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const lang = selectElement.value;
    this.translate.use(lang);
  }
}
