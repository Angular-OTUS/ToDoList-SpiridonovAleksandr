import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Header } from '../../shared/header/header';
import { EmptyList } from '../../shared/empty-list/empty-list';
import { LoadingSpinner } from '../../shared/loading-spinner/loading-spinner';
import { Router } from '@angular/router';
import { ToDoListItem } from '../to-do-list-item/to-do-list-item';
import { TODO_TOAST_MESSAGES } from '../../../tokens/to-do-toast.token';
import { ToastService } from '../../../services/toast.service';
import { ToastType } from '../../../model/toast-dto';
import { ToDo, ToDoDto, ToDoStatus } from '../../../model/to-do';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { ToDoStore } from '../../../state/to-do.store';

@Component({
  selector: 'app-board',
  imports: [
    Header,
    EmptyList,
    LoadingSpinner,
    ToDoListItem,
    DragDropModule,
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
  private readonly router: Router = inject(Router);
  private readonly toastService: ToastService = inject(ToastService);
  private readonly toastMessages: Record<ToastType, string> = inject(TODO_TOAST_MESSAGES);
  protected readonly store = inject(ToDoStore);

  protected addTask(task: ToDoDto) {
    this.store.add(task);
    this.toastService.showToast(this.toastMessages.success, 'success');
  }

  protected deleteTask(id: number) {
    this.store.removeById(id);
    this.toastService.showToast(this.toastMessages.warning, 'warning');
    this.router.navigate(['board']);
  }

  protected saveTask(toDo: ToDo) {
    this.store.update(toDo);
    this.hideAllTooltips();
    this.toastService.showToast(this.toastMessages.info, 'info');
  }

  protected onDrop(event: CdkDragDrop<ToDo[]>, targetStatus: ToDoStatus) {
    const draggedItem = event.item.data as ToDo;

    const previousStatus = draggedItem.status;
    const isMovedToAnotherColumn = previousStatus !== targetStatus;

    if (!isMovedToAnotherColumn) {
      return;
    }

    const updatedTask = { ...draggedItem, status: targetStatus };
    this.saveTask(updatedTask);
  }

  private hideAllTooltips(): void {
    document.querySelectorAll('[data-tooltip]').forEach(el => {
      if (el.parentNode) {
        el.parentNode.removeChild(el);
      }
    });
  }
}
