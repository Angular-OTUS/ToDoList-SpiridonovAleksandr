import { InjectionToken } from '@angular/core';
import { ToastType } from '../model/toast-dto';

export const TODO_TOAST_MESSAGES = new InjectionToken<Record<ToastType, string>>('TODO_TOAST_MESSAGES');
