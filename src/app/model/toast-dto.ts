export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastDto {
  id: number;
  message: string;
  type: ToastType;
  duration?: number;
}
