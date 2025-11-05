import {
  ChangeDetectionStrategy,
  Component,
  computed,
  model,
  ModelSignal,
  output,
  OutputEmitterRef,
  Signal,
} from '@angular/core';
import { Button } from '../../shared/button/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToDoDto } from '../../../model/to-do';

@Component({
  selector: 'app-to-do-create-item',
  imports: [
    Button,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './to-do-create-item.html',
  styleUrl: './to-do-create-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoCreateItem {
  protected newTask: ModelSignal<string> = model<string>('');
  protected newTaskDescription: ModelSignal<string> = model<string>('');
  protected isNewTaskEmpty: Signal<boolean> = computed(() => this.newTask().length === 0);
  protected taskToAdd: OutputEmitterRef<ToDoDto> = output<ToDoDto>();

  protected onAdding() {
    this.taskToAdd.emit({
      text: this.newTask(),
      description: this.newTaskDescription(),
      status: 'CREATED',
    });
    this.newTask.set('');
    this.newTaskDescription.set('');
  }
}
