import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
  Signal,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { Tooltip } from '../../../directives/tooltip';

type ButtonAction = 'add'|'delete'|'save';

@Component({
  selector: 'app-button',
  imports: [
    NgClass,
    Tooltip,
  ],
  templateUrl: './button.html',
  styleUrl: './button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Button {
  public actionType: InputSignal<ButtonAction> = input.required<ButtonAction>();
  public isDisabled = input<boolean>(false);

  protected actionClass: Signal<string> = computed(() => {
    switch (this.actionType()) {
      case "add":
        return 'add-btn';
      case "delete":
        return 'delete-btn';
      default:
        return 'save-btn';
    }
  });

  protected tooltipText = computed(() =>
    `Жмякни кнопочку для ${(this.actionType() === 'add') ? 'добавления' : 'удаления'}`);

  protected clicked: OutputEmitterRef<Event> = output<Event>();
}
