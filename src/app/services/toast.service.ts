import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { ToastDto, ToastType } from '../model/toast-dto';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toasts: WritableSignal<ToastDto[]> = signal<ToastDto[]>([]);
  private nextId = 1;

  public currentToasts: Signal<ToastDto[]> = this.toasts.asReadonly();
  public hasToasts: Signal<boolean> = computed(() => this.toasts().length > 0);

  showToast(
    message: string,
    type: ToastType = 'info',
    duration = 3000,
  ): void {
    const id = this.nextId++;
    const toast: ToastDto = { id, message, type, duration };

    this.toasts.update(toasts => [...toasts, toast]);

    if (duration > 0) {
      setTimeout(() => {
        this.removeToast(id);
      }, duration);
    }
  }

  removeToast(id: number): void {
    this.toasts.update(toasts => toasts.filter(toast => toast.id !== id));
  }
}
