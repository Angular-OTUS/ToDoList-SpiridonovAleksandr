import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { Header } from '../../shared/header/header';
import { LoadingSpinner } from '../../shared/loading-spinner/loading-spinner';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { ToDoListItem } from '../to-do-list-item/to-do-list-item';
import { TODO_TOAST_MESSAGES } from '../../../tokens/to-do-toast.token';
import { ToastService } from '../../../services/toast.service';
import { ToDoEventService } from '../../../services/to-do-event.service';
import { ToastType } from '../../../model/toast-dto';
import { Tooltip } from '../../../directives/tooltip';
import { filter } from 'rxjs';
import { ToDo, ToDoDto } from '../../../model/to-do';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { EmptyList } from '../../shared/empty-list/empty-list';
import { ToDoStore } from '../../../state/to-do.store';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-backlog',
  imports: [
    Header,
    LoadingSpinner,
    RouterOutlet,
    ToDoListItem,
    Tooltip,
    EmptyList,
    TranslatePipe,
  ],
  providers: [
    {
      provide: TODO_TOAST_MESSAGES,
      useValue: {
        success: 'toast.add',
        warning: 'toast.delete',
        info: 'toast.save',
      },
    },
  ],
  templateUrl: './backlog.html',
  styleUrl: './backlog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Backlog implements OnInit {
  private readonly destroyRef: DestroyRef = inject(DestroyRef);
  private readonly router: Router = inject(Router);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly toastService: ToastService = inject(ToastService);
  private readonly toDoEventService: ToDoEventService = inject(ToDoEventService);
  private readonly translate = inject(TranslateService);
  private readonly toastMessages: Record<ToastType, string> = inject(TODO_TOAST_MESSAGES);
  protected readonly store = inject(ToDoStore);

  protected selectedItemId: WritableSignal<number | null> = signal<number | null>(null);

  protected tooltipText: Signal<string> = toSignal(
    this.translate.stream('tooltip.task-description'),
    { initialValue: null },
  );

  private addToastMessage: Signal<string> = toSignal(
    this.translate.stream(this.toastMessages.success),
    { initialValue: null },
  );

  private deleteToastMessage: Signal<string> = toSignal(
    this.translate.stream(this.toastMessages.warning),
    { initialValue: null },
  );

  private saveToastMessage: Signal<string> = toSignal(
    this.translate.stream(this.toastMessages.info),
    { initialValue: null },
  );

  ngOnInit(): void {
    this.store.getAll();

    this.toDoEventService.statusChanged$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(task => this.saveTask(task));
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe((event) => {
      if (event.urlAfterRedirects === '/backlog') {
        this.selectedItemId.set(null);
      }
    });
  }

  protected addTask(task: ToDoDto) {
    this.store.add(task);
    this.selectedItemId.set(null);
    this.toastService.showToast(this.addToastMessage(), 'success');
    this.router.navigate(['backlog']);
  }

  protected deleteTask(id: number) {
    this.store.removeById(id);
    this.selectedItemId.set(null);
    this.toastService.showToast(this.deleteToastMessage(), 'warning');
    this.router.navigate(['backlog']);
  }

  protected saveTask(toDo: ToDo) {
    this.store.update(toDo);
    this.hideAllTooltips();
    this.toastService.showToast(this.saveToastMessage(), 'info');
    this.router.navigate(['backlog']);
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
