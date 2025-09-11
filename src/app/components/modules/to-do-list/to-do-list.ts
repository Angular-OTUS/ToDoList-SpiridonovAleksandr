import {
  ChangeDetectionStrategy,
  Component,
  computed,
  model,
  ModelSignal,
  OnInit,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { ToDo } from '../../../model/to-do';
import { FormsModule } from '@angular/forms';
import { ToDoListItem } from '../to-do-list-item/to-do-list-item';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Button } from '../../shared/button/button';
import { Tooltip } from '../../../directives/tooltip';

const DEFAULT_DESCRIPTION = 'Описание';
const EMPTY_DESCRIPTION = 'Не заполнено';

@Component({
  selector: 'app-to-do-list',
  imports: [
    FormsModule,
    MatProgressSpinnerModule,
    ToDoListItem,
    Button,
    Tooltip,
  ],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoList implements OnInit {
  protected newTask: ModelSignal<string> = model<string>('');
  protected newTaskDescription: ModelSignal<string> = model<string>('');
  protected isNewTaskEmpty: Signal<boolean> = computed(() => this.newTask().length === 0);
  protected isLoading: WritableSignal<boolean> = signal<boolean>(true);

  protected selectedItemId: WritableSignal<number | null> = signal<number | null>(null);
  protected description: Signal<string> = computed(() => {
    const id = this.selectedItemId();
    return this.getDescription(id);
  });

  protected readonly toDoList: ToDo[] = [
    {
      id: 1,
      text: 'Посадить печень',
      description: 'Пить много спиртосодержащих напитков - пива, водки и прочего',
    },
    {
      id: 2,
      text: 'Вырастить пузо',
      description: 'Жрать много жирного, сладкого и жареного',
    },
    {
      id: 3,
      text: 'Построить тещу',
      description: 'Быть брутальным мачо, разговаривать грозным голосом сдвинув брови',
    },
  ];

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading.set(false);
    }, 500);
  }

  protected addTask() {
    const ids = this.toDoList.map(item => item.id);
    const maxId = Math.max(...ids);
    const newToDo = { id: maxId + 1, text: this.newTask(), description: this.newTaskDescription() };
    this.toDoList.push(newToDo);
    this.newTask.set('');
    this.newTaskDescription.set('');
  }

  protected deleteTask(id: number) {
    const index = this.toDoList.findIndex(item => item.id === id);
    if (index > -1) {
      this.toDoList.splice(index, 1);
    }
    this.selectedItemId.set(null);
  }

  protected onItemClick(id: number) {
    this.selectedItemId.set(id);
  }

  private getDescription(id: number | null): string {
    if (id != null) {
      const selectedDescription = this.toDoList.find(item => item.id === id)?.description;
      switch (selectedDescription) {
        case undefined:
          return DEFAULT_DESCRIPTION;
        case '':
          return EMPTY_DESCRIPTION;
        default:
          return selectedDescription;
      }
    }
    return DEFAULT_DESCRIPTION;
  }
}
