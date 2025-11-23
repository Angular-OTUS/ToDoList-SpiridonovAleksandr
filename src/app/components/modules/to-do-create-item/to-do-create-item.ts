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
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-to-do-create-item',
  imports: [
    Button,
    ReactiveFormsModule,
    FormsModule,
    TranslatePipe,
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

  public resetForm() {
    this.newTask.set('');
    this.newTaskDescription.set('');
  }

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
