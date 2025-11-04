import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  Signal,
  signal,
  WritableSignal
} from '@angular/core';
import { Header } from '../../shared/header/header';
import { LoadingSpinner } from '../../shared/loading-spinner/loading-spinner';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { ToDoListItem } from '../to-do-list-item/to-do-list-item';
import { TODO_TOAST_MESSAGES } from '../../../tokens/to-do-toast.token';
import { ToDoListApiService } from '../../../services/to-do-list.api.service';
import { ToastService } from '../../../services/toast.service';
import { ToDoEventService } from '../../../services/to-do-event.service';
import { ToastType } from '../../../model/toast-dto';
import { Tooltip } from '../../../directives/tooltip';
import { filter, finalize, map, Observable, of, startWith, Subject, switchMap } from 'rxjs';
import { ToDo, ToDos } from '../../../model/to-do';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-backlog',
  imports: [
    Header,
    LoadingSpinner,
    RouterOutlet,
    ToDoListItem,
    Tooltip
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
  templateUrl: './backlog.html',
  styleUrl: './backlog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Backlog implements OnInit {
  private readonly destroyRef: DestroyRef = inject(DestroyRef);
  private readonly toDoListService: ToDoListApiService = inject(ToDoListApiService);
  private readonly router: Router = inject(Router);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly toastService: ToastService = inject(ToastService);
  private readonly toDoEventService: ToDoEventService = inject(ToDoEventService);
  private readonly toastMessages: Record<ToastType, string> = inject(TODO_TOAST_MESSAGES);

  protected isLoading: WritableSignal<boolean> = signal<boolean>(false);

  protected selectedItemId: WritableSignal<number | null> = signal<number | null>(null);

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
  protected toDoList: Signal<ToDo[]> = toSignal(
    this.toDos$.pipe(
      map(toDos => toDos.items.filter(item => item.status === 'CREATED'))
    ), {
      initialValue: []
    }
  );

  ngOnInit(): void {
    this.toDoEventService.statusChanged$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(task => this.saveTask(task));
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((event) => {
      if (event.urlAfterRedirects === '/backlog') {
        this.selectedItemId.set(null);
      }
    });
  }

  protected deleteTask(id: number) {
    this.isLoading.set(true);
    this.toDoListService.removeById(id).subscribe({
      next: () => {
        this.refreshTrigger$.next();
      },
    });
    this.selectedItemId.set(null);
    this.toastService.showToast(this.toastMessages.warning, 'warning');
    this.router.navigate(['backlog']);
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

  protected onItemClick(id: number) {
    this.selectedItemId.set(id);
    this.router.navigate([id], { relativeTo: this.route });
  }

  private hideAllTooltips(): void {
    document.querySelectorAll('[data-tooltip]').forEach(el => {
      if (el.parentNode) {
        el.parentNode.removeChild(el);
      }
    });
  }
}
