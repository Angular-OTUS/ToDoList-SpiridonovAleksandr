import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
  Signal,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { Tooltip, TooltipPosition } from '../../../directives/tooltip';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslateService } from '@ngx-translate/core';

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
  private readonly translate = inject(TranslateService);
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

  private tooltipAddMessage: Signal<string> = toSignal(
    this.translate.stream('tooltip.add-btn-click'),
    { initialValue: null },
  );

  private tooltipDeleteMessage: Signal<string> = toSignal(
    this.translate.stream('tooltip.delete-btn-click'),
    { initialValue: null },
  );

  private tooltipSaveMessage: Signal<string> = toSignal(
    this.translate.stream('tooltip.save-btn-click'),
    { initialValue: null },
  );

  protected tooltipText = computed(() => {
    let action;
    switch (this.actionType()) {
      case "add":
        action = this.tooltipAddMessage();
        break
      case "delete":
        action = this.tooltipDeleteMessage();
        break
      default:
        action = this.tooltipSaveMessage();
    }
    return action;
  });

  protected clicked: OutputEmitterRef<Event> = output<Event>();
}
