import { ChangeDetectionStrategy, Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { ToDo } from '../../../model/to-do';
import { Button } from '../../shared/button/button';

@Component({
  selector: 'app-to-do-list-item',
  imports: [
    Button,
  ],
  templateUrl: './to-do-list-item.html',
  styleUrl: './to-do-list-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoListItem {
  public item: InputSignal<ToDo> = input.required<ToDo>();
  public isSelected: InputSignal<boolean> = input<boolean>(false);
  protected taskToRemove: OutputEmitterRef<number> = output<number>();

  protected onDelete(event: Event, id: number) {
    event.stopPropagation();
    this.taskToRemove.emit(id);
  }
}
