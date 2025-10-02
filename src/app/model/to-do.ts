export interface ToDos {
  items: ToDo[];
}

export type ToDoStatus = 'IN_PROGRESS' | 'COMPLETED';

export type ToDoFilterStatus = ToDoStatus | 'ALL';

export interface ToDo {
  id: number;
  text: string;
  description: string;
  status: ToDoStatus;
}

export interface ToDoDto {
  text: string;
  description: string;
  status: ToDoStatus;
}
