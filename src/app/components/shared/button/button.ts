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
import { Tooltip, TooltipPosition } from '../../../directives/tooltip';

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
  public isDisabled: InputSignal<boolean> = input<boolean>(false);
  public tooltipPosition: InputSignal<TooltipPosition> = input<TooltipPosition>('above');

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

  protected tooltipText = computed(() => {
    let action;
    switch (this.actionType()) {
      case "add":
        action = 'добавления';
        break
      case "delete":
        action = 'удаления';
        break
      default:
        action = 'изменения';
    }
    return `Жмякни кнопочку для ${action}`
  });

  protected clicked: OutputEmitterRef<Event> = output<Event>();
}
