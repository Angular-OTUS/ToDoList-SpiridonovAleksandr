import { ChangeDetectionStrategy, Component } from '@angular/core';

const DEFAULT_DESCRIPTION = 'Описание';

@Component({
  selector: 'app-no-description-item-view',
  imports: [],
  templateUrl: './no-description-item-view.html',
  styleUrl: './no-description-item-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoDescriptionItemView {
  protected description: string = DEFAULT_DESCRIPTION;
}
