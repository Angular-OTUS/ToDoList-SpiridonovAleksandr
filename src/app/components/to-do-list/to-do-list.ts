import { Component, computed, model, ModelSignal, Signal } from '@angular/core';
import { ToDo } from '../../model/to-do';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-to-do-list',
  imports: [
    FormsModule
  ],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.scss'
})
export class ToDoList {
  protected newTask: ModelSignal<string> = model<string>('');
  protected isNewTaskEmpty: Signal<boolean> = computed(() => this.newTask().length === 0);

  protected readonly toDoList: ToDo[] = [
    {
      id: 1,
      text: 'Посадить печень'
    },
    {
      id: 2,
      text: 'Вырастить пузо'
    },
    {
      id: 3,
      text: 'Построить тещу'
    }
  ];
}
