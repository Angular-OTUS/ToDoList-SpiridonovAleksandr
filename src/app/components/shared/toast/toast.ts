import { Component, inject, Signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { ToastService } from '../../../services/toast.service';
import { ToastDto } from '../../../model/toast-dto';

@Component({
  selector: 'app-toast',
  imports: [
    NgClass
  ],
  templateUrl: './toast.html',
  styleUrl: './toast.scss'
})
export class Toast {
  private toastService = inject(ToastService);

  protected toasts: Signal<ToastDto[]> = this.toastService.currentToasts;

  protected removeToast(id: number): void {
    this.toastService.removeToast(id);
  }
}
