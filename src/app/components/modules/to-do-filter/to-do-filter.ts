import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  model,
  ModelSignal,
  output,
  OutputEmitterRef,
} from '@angular/core';
import { ToDoFilterStatus } from '../../../model/to-do';
import { FormsModule } from '@angular/forms';
import { TODO_FILTER_OPTIONS, ToDoFilterOption } from '../../../tokens/to-do-filter.token';

@Component({
  selector: 'app-to-do-filter',
  imports: [
    FormsModule,
  ],
  providers: [
    {
      provide: TODO_FILTER_OPTIONS,
      useValue: [
        { value: 'ALL', label: 'Все' },
        { value: 'IN_PROGRESS', label: 'В процессе' },
        { value: 'COMPLETED', label: 'Завершенные' },
      ],
    },
  ],
  templateUrl: './to-do-filter.html',
  styleUrl: './to-do-filter.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoFilter {
  protected readonly filterOptions: ToDoFilterOption[] = inject(TODO_FILTER_OPTIONS);

  protected selectedStatus: ModelSignal<ToDoFilterStatus> = model<ToDoFilterStatus>('ALL');
  protected statusChanged: OutputEmitterRef<ToDoFilterStatus> = output<ToDoFilterStatus>();

  constructor() {
    effect(() => {
      this.statusChanged.emit(this.selectedStatus());
    });
  }
}
