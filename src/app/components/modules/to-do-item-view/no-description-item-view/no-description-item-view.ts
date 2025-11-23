import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslateService } from '@ngx-translate/core';

const DEFAULT_TITLE = 'Description';

@Component({
  selector: 'app-no-description-item-view',
  imports: [],
  templateUrl: './no-description-item-view.html',
  styleUrl: './no-description-item-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoDescriptionItemView {
  private readonly translate = inject(TranslateService);
  protected title = toSignal(
    this.translate.stream('view.title'),
    { initialValue: DEFAULT_TITLE }
  );
}
