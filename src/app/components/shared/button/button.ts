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

type ButtonAction = 'add'|'delete';

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
  public title: InputSignal<string> = input.required<string>();
  public actionType: InputSignal<ButtonAction> = input.required<ButtonAction>();
  public isDisabled = input<boolean>(false);

  protected actionClass: Signal<string> = computed(() => {
    return this.actionType() === 'add' ? 'add-btn' : 'delete-btn'
  });

  protected clicked: OutputEmitterRef<Event> = output<Event>();
}
