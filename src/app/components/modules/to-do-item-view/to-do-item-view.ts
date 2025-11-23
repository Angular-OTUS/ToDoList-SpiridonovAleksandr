import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { ToDo, ToDoStatus } from '../../../model/to-do';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { of, switchMap } from 'rxjs';
import { LoadingSpinner } from '../../shared/loading-spinner/loading-spinner';
import { ToDoEventService } from '../../../services/to-do-event.service';
import { Button } from '../../shared/button/button';
import { ToDoStore } from '../../../state/to-do.store';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

const EMPTY_DESCRIPTION = 'Не заполнено';

@Component({
  selector: 'app-to-do-item-view',
  imports: [
    LoadingSpinner,
    Button,
    TranslatePipe,
  ],
  templateUrl: './to-do-item-view.html',
  styleUrl: './to-do-item-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoItemView {
  private readonly toDoEventService: ToDoEventService = inject(ToDoEventService);
  private readonly translate = inject(TranslateService);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  protected readonly store = inject(ToDoStore);

  protected item: Signal<ToDo | null> = toSignal(
    this.route.paramMap.pipe(
      switchMap(paramMap => {
        const id = paramMap.get('id');
        if (!id) return of(null);
        return of(this.store.entities().find(item => item.id === Number(id)) ?? null);
      }),
    ),
    { initialValue: null },
  );

  protected emptyDescription = toSignal(
    this.translate.stream('view.empty'),
    { initialValue: EMPTY_DESCRIPTION },
  );

  protected description: Signal<string> = computed(() => this.item()?.description || this.emptyDescription());

  protected onStatusChange(event: Event, targetStatus: ToDoStatus) {
    event.stopPropagation();
    if (this.item()) {
      const updatedTask: ToDo = { ...this.item()!, status: targetStatus };
      this.toDoEventService.statusChanged(updatedTask);
    }
  }
}
