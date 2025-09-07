import { Component, computed, input, InputSignal, output, OutputEmitterRef, Signal } from '@angular/core';
import { NgClass } from '@angular/common';

type ButtonAction = 'add'|'delete';

@Component({
  selector: 'app-button',
  imports: [
    NgClass,
  ],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  public title: InputSignal<string> = input.required<string>();
  public actionType: InputSignal<ButtonAction> = input.required<ButtonAction>();
  public isDisabled = input<boolean>(false);

  protected actionClass: Signal<string> = computed(() => {
    return this.actionType() === 'add' ? 'add-btn' : 'delete-btn'
  });

  protected clicked: OutputEmitterRef<void> = output<void>();
}
