import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  InputSignal,
  model,
  ModelSignal,
  output,
  OutputEmitterRef,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { ToDo } from '../../../model/to-do';
import { Button } from '../../shared/button/button';
import { FormsModule } from '@angular/forms';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-to-do-list-item',
  imports: [
    Button,
    FormsModule,
    NgTemplateOutlet,
  ],
  templateUrl: './to-do-list-item.html',
  styleUrl: './to-do-list-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoListItem {
  public item: InputSignal<ToDo> = input.required<ToDo>();
  public isSelected: InputSignal<boolean> = input<boolean>(false);
  protected taskToRemove: OutputEmitterRef<number> = output<number>();
  protected taskToSave: OutputEmitterRef<ToDo> = output<ToDo>();

  protected newText: ModelSignal<string | undefined> = model<string | undefined>();
  protected isNewTextEmpty: Signal<boolean> = computed(() => this.newText()?.length === 0);
  protected isEditMode: WritableSignal<boolean> = signal<boolean>(false);

  constructor() {
    effect(() => {
      if (!this.isSelected()) {
        this.isEditMode.set(false);
      }
    });
  }

  protected toggleToEditMode() {
    this.isEditMode.set(true);
    this.newText.set(this.item().text);
  }

  protected onDelete(event: Event, id: number) {
    event.stopPropagation();
    this.taskToRemove.emit(id);
  }

  protected onSave(event: Event) {
    event.stopPropagation();
    const updatedTask = { ...this.item(), text: this.newText() ?? '' };
    this.taskToSave.emit(updatedTask);
    this.isEditMode.set(false);
  }
}
