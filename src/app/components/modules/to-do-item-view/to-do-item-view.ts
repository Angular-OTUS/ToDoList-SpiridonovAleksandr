import { ChangeDetectionStrategy, Component, computed, inject, signal, Signal, WritableSignal } from '@angular/core';
import { Checkbox } from '../../shared/checkbox/checkbox';
import { ToDo } from '../../../model/to-do';
import { ToDoListApiService } from '../../../services/to-do-list.api.service';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { finalize, map, of, switchMap } from 'rxjs';
import { LoadingSpinner } from '../../shared/loading-spinner/loading-spinner';
import { ToDoEventService } from '../../../services/to-do-event.service';

const EMPTY_DESCRIPTION = 'Не заполнено';

@Component({
  selector: 'app-to-do-item-view',
  imports: [
    Checkbox,
    LoadingSpinner,
  ],
  templateUrl: './to-do-item-view.html',
  styleUrl: './to-do-item-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoItemView {
  private readonly toDoListService: ToDoListApiService = inject(ToDoListApiService);
  private readonly toDoEventService: ToDoEventService = inject(ToDoEventService);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  protected isLoading: WritableSignal<boolean> = signal<boolean>(false);

  protected item: Signal<ToDo | null> = toSignal(
    this.route.paramMap.pipe(
      switchMap(paramMap => {
        const id = paramMap.get('id');
        if (!id) return of(null);
        this.isLoading.set(true);
        return this.toDoListService.getById(Number(id)).pipe(
          map(todo => todo ?? null),
          finalize(() => this.isLoading.set(false)),
        );
      }),
    ),
    { initialValue: null },
  );

  protected description: Signal<string> = computed(() => this.item()?.description || EMPTY_DESCRIPTION);

  protected onStatusChange(event: Event) {
    event.stopPropagation();
    const target = event.target as HTMLInputElement;
    const checked = target.checked;
    if (this.item()) {
      const updatedTask: ToDo = { ...this.item()!, status: checked ? 'COMPLETED' : 'IN_PROGRESS' };
      this.toDoEventService.statusChanged(updatedTask);
    }
  }
}
