import {
  ChangeDetectionStrategy,
  Component,
  computed, inject,
  model,
  ModelSignal,
  OnInit,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { ToDo, ToDos } from '../../../model/to-do';
import { FormsModule } from '@angular/forms';
import { ToDoListItem } from '../to-do-list-item/to-do-list-item';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Button } from '../../shared/button/button';
import { Tooltip } from '../../../directives/tooltip';
import { ToDoListService } from '../../../services/to-do-list.service';
import { ToastService } from '../../../services/toast.service';
import { TODO_TOAST_MESSAGES } from '../../../tokens/to-do-toast.token';
import { ToastType } from '../../../model/toast-dto';

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
  providers: [
    {
      provide: TODO_TOAST_MESSAGES,
      useValue: {
        success: 'Задача успешно добавлена',
        warning: 'Задача удалена',
        info: 'Задача изменена',
      },
    },
  ],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoList implements OnInit {
  private readonly toDoListService: ToDoListService = inject(ToDoListService);
  private readonly toastService: ToastService = inject(ToastService);
  private readonly toastMessages: Record<ToastType, string> = inject(TODO_TOAST_MESSAGES);

  protected newTask: ModelSignal<string> = model<string>('');
  protected newTaskDescription: ModelSignal<string> = model<string>('');
  protected isNewTaskEmpty: Signal<boolean> = computed(() => this.newTask().length === 0);
  protected isLoading: WritableSignal<boolean> = signal<boolean>(true);

  protected selectedItemId: WritableSignal<number | null> = signal<number | null>(null);
  protected description: Signal<string> = computed(() => {
    const id = this.selectedItemId();
    return this.getDescription(id);
  });

  protected toDos: WritableSignal<ToDos | undefined> = signal<ToDos | undefined>(undefined);
  protected isToDoListEmpty: Signal<boolean> = computed(() => {
    if (this.toDos()) {
      return this.toDos()?.items.length === 0;
    }
    return false;
  });

  ngOnInit(): void {
    this.toDos.set(this.toDoListService.getAll());
    setTimeout(() => {
      this.isLoading.set(false);
    }, 500);
  }

  protected addTask() {
    this.toDoListService.add({ text: this.newTask(), description: this.newTaskDescription() });
    this.newTask.set('');
    this.newTaskDescription.set('');
    this.toDos.set(this.toDoListService.getAll());
    this.toastService.showToast(this.toastMessages.success, 'success');
  }

  protected deleteTask(id: number) {
    this.toDoListService.removeById(id);
    this.selectedItemId.set(null);
    this.toDos.set(this.toDoListService.getAll());
    this.toastService.showToast(this.toastMessages.warning, 'warning');
  }

  protected saveTask(toDo: ToDo) {
    this.toDoListService.update(toDo);
    this.toastService.showToast(this.toastMessages.info, 'info');
  }

  protected onItemClick(id: number) {
    this.selectedItemId.set(id);
  }

  private getDescription(id: number | null): string {
    if (id != null) {
      const selectedDescription = this.toDoListService.getById(id)?.description;
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
