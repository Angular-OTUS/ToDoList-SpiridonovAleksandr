import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  Signal,
  signal,
  WritableSignal
} from '@angular/core';
import { Header } from '../../shared/header/header';
import { EmptyList } from '../../shared/empty-list/empty-list';
import { LoadingSpinner } from '../../shared/loading-spinner/loading-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { ToDoListItem } from '../to-do-list-item/to-do-list-item';
import { TODO_TOAST_MESSAGES } from '../../../tokens/to-do-toast.token';
import { ToDoListApiService } from '../../../services/to-do-list.api.service';
import { ToastService } from '../../../services/toast.service';
import { ToDoEventService } from '../../../services/to-do-event.service';
import { ToastType } from '../../../model/toast-dto';
import { finalize, Observable, startWith, Subject, switchMap } from 'rxjs';
import { ToDo, ToDos } from '../../../model/to-do';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-board',
  imports: [
    Header,
    EmptyList,
    LoadingSpinner,
    ToDoListItem
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
  templateUrl: './board.html',
  styleUrl: './board.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Board {
  private readonly destroyRef: DestroyRef = inject(DestroyRef);
  private readonly toDoListService: ToDoListApiService = inject(ToDoListApiService);
  private readonly router: Router = inject(Router);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly toastService: ToastService = inject(ToastService);
  private readonly toDoEventService: ToDoEventService = inject(ToDoEventService);
  private readonly toastMessages: Record<ToastType, string> = inject(TODO_TOAST_MESSAGES);

  protected isLoading: WritableSignal<boolean> = signal<boolean>(false);

  private refreshTrigger$: Subject<void> = new Subject<void>();
  private toDos$: Observable<ToDos> = this.refreshTrigger$.pipe(
    startWith(undefined),
    switchMap(() => {
      this.isLoading.set(true);
      return this.toDoListService.getAll().pipe(
        finalize(() => this.isLoading.set(false)),
      );
    }),
  );
  protected toDos: Signal<ToDos> = toSignal(this.toDos$, {
    initialValue: { items: [] }
  });

  protected created: Signal<ToDo[]> = computed(() =>
    this.toDos().items.filter(item => item.status === 'CREATED')
  );

  protected inProgress: Signal<ToDo[]> = computed(() =>
    this.toDos().items.filter(item => item.status === 'IN_PROGRESS')
  );

  protected completed: Signal<ToDo[]> = computed(() =>
    this.toDos().items.filter(item => item.status === 'COMPLETED')
  );

  protected deleteTask(id: number) {
    this.isLoading.set(true);
    this.toDoListService.removeById(id).subscribe({
      next: () => {
        this.refreshTrigger$.next();
      },
    });
    this.toastService.showToast(this.toastMessages.warning, 'warning');
    this.router.navigate(['board']);
  }

  protected saveTask(toDo: ToDo) {
    this.toDoListService.update(toDo).subscribe({
      next: () => {
        this.refreshTrigger$.next();
      },
    });
    this.hideAllTooltips();
    this.toastService.showToast(this.toastMessages.info, 'info');
  }

  private hideAllTooltips(): void {
    document.querySelectorAll('[data-tooltip]').forEach(el => {
      if (el.parentNode) {
        el.parentNode.removeChild(el);
      }
    });
  }
}
