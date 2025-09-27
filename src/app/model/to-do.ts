export interface ToDos {
  items: ToDo[];
}

export interface ToDo {
  id: number;
  text: string;
  description: string;
}

export interface ToDoDto {
  text: string;
  description: string;
}
