import { Component, computed, model, ModelSignal, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { ToDo } from '../../model/to-do';
import { FormsModule } from '@angular/forms';
import { ToDoListItem } from '../to-do-list-item/to-do-list-item';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-to-do-list',
  imports: [
    FormsModule,
    MatProgressSpinnerModule,
    ToDoListItem
  ],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.scss'
})
export class ToDoList implements OnInit {
  protected newTask: ModelSignal<string> = model<string>('');
  protected isNewTaskEmpty: Signal<boolean> = computed(() => this.newTask().length === 0);
  protected isLoading: WritableSignal<boolean> = signal<boolean>(true);

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

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading.set(false);
    }, 500);
  }

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
