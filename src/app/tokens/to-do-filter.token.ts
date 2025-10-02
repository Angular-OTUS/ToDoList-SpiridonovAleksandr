import { InjectionToken } from '@angular/core';

export interface ToDoFilterOption {
  value: string;
  label: string;
}

export const TODO_FILTER_OPTIONS = new InjectionToken<ToDoFilterOption[]>('TODO_FILTER_OPTIONS');
