import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { ToDo, ToDoDto, ToDoFilterStatus, ToDos } from '../../../model/to-do';
import { FormsModule } from '@angular/forms';
import { ToDoListItem } from '../to-do-list-item/to-do-list-item';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Tooltip } from '../../../directives/tooltip';
import { ToastService } from '../../../services/toast.service';
import { TODO_TOAST_MESSAGES } from '../../../tokens/to-do-toast.token';
import { ToastType } from '../../../model/toast-dto';
import { LoadingSpinner } from '../../shared/loading-spinner/loading-spinner';
import { ToDoFilter } from '../to-do-filter/to-do-filter';
import { ToDoCreateItem } from '../to-do-create-item/to-do-create-item';
import { ToDoListApiService } from '../../../services/to-do-list.api.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { finalize, map, Observable, of, startWith, Subject, switchMap } from 'rxjs';

const DEFAULT_DESCRIPTION = 'Описание';
const EMPTY_DESCRIPTION = 'Не заполнено';

@Component({
  selector: 'app-to-do-list',
  imports: [
    FormsModule,
    MatProgressSpinnerModule,
    ToDoListItem,
    Tooltip,
    LoadingSpinner,
    ToDoFilter,
    ToDoCreateItem,
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
  private readonly toDoListService: ToDoListApiService = inject(ToDoListApiService);
  private readonly toastService: ToastService = inject(ToastService);
  private readonly toastMessages: Record<ToastType, string> = inject(TODO_TOAST_MESSAGES);

  protected isLoading: WritableSignal<boolean> = signal<boolean>(false);

  protected selectedItemId: WritableSignal<number | null> = signal<number | null>(null);
  private selectedItemId$: Observable<number | null> = toObservable(this.selectedItemId);
  protected description: Signal<string> = toSignal(
    this.selectedItemId$.pipe(
      switchMap(id => {
        if (id === null) {
          return of(DEFAULT_DESCRIPTION);
        }
        return this.toDoListService.getById(id).pipe(
          map(task => {
            return this.getDescription(task);
          })
        );
      })
    ),
    { initialValue: DEFAULT_DESCRIPTION }
  );

  private refreshTrigger$: Subject<void> = new Subject<void>();
  private toDos$: Observable<ToDos> = this.refreshTrigger$.pipe(
    startWith(undefined),
    switchMap(() => {
      this.isLoading.set(true);
      return this.toDoListService.getAll().pipe(
        finalize(() => this.isLoading.set(false))
      );
    })
  );
  private toDos = toSignal(this.toDos$, {
    initialValue: undefined
  });

  protected filterStatus: WritableSignal<ToDoFilterStatus> = signal<ToDoFilterStatus>('ALL');
  protected filteredToDoList = computed(() => {
    const status = this.filterStatus();
    if (this.toDos()) {
      const items = this.toDos()!.items;
      return (status === 'ALL') ? items : items.filter(item => item.status === status);
    } else {
      return [];
    }
  });

  ngOnInit(): void {
    this.refreshTrigger$.next();
  }

  protected addTask(task: ToDoDto) {
    this.isLoading.set(true);
    this.toDoListService.add(task).subscribe({
      next: () => {
        this.refreshTrigger$.next();
      }
    });
    this.toastService.showToast(this.toastMessages.success, 'success');
  }

  protected deleteTask(id: number) {
    this.isLoading.set(true);
    this.toDoListService.removeById(id).subscribe({
      next: () => {
        this.refreshTrigger$.next();
      }
    });
    this.selectedItemId.set(null);
    this.toastService.showToast(this.toastMessages.warning, 'warning');
  }

  protected saveTask(toDo: ToDo) {
    this.toDoListService.update(toDo).subscribe({
      next: () => {
        this.refreshTrigger$.next();
      }
    });
    this.hideAllTooltips();
    this.toastService.showToast(this.toastMessages.info, 'info');
  }

  protected onItemClick(id: number) {
    this.selectedItemId.set(id);
  }

  protected onFilterChange(status: ToDoFilterStatus) {
    this.selectedItemId.set(null);
    this.filterStatus.set(status);
  }

  private getDescription(task: ToDo | undefined): string {
    const selectedDescription = task?.description;
    switch (selectedDescription) {
      case undefined:
        return DEFAULT_DESCRIPTION;
      case '':
        return EMPTY_DESCRIPTION;
      default:
        return selectedDescription;
    }
  }

  private hideAllTooltips(): void {
    document.querySelectorAll('[data-tooltip]').forEach(el => {
      if (el.parentNode) {
        el.parentNode.removeChild(el);
      }
    });
  }
}
