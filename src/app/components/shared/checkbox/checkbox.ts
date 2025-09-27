import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
} from '@angular/core';

@Component({
  selector: 'app-checkbox',
  imports: [],
  templateUrl: './checkbox.html',
  styleUrl: './checkbox.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Checkbox {
  public readonly itemId: InputSignal<number> = input.required<number>();
  public readonly isChecked: InputSignal<boolean> = input.required<boolean>();
  protected checkboxId = computed(() => `checkbox_${this.itemId()}`);
  protected checked: OutputEmitterRef<Event> = output<Event>();
}
