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

  protected addTask() {
    const ids = this.toDoList.map(item => item.id);
    const maxId = Math.max(...ids);
    const newToDo = { id: maxId + 1, text: this.newTask() };
    this.toDoList.push(newToDo);
    this.newTask.set('');
  }

  protected deleteTask(id: number) {
    const index = this.toDoList.findIndex(item => item.id === id);
    if (index > -1) {
      this.toDoList.splice(index, 1);
    }
  }
}
