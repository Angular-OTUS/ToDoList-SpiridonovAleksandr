import { Injectable } from '@angular/core';
import { ToDo, ToDoDto, ToDos } from '../model/to-do';

@Injectable({
  providedIn: 'root'
})
export class ToDoListService {
  private readonly toDoList: ToDo[] = [
    {
      id: 1,
      text: 'Посадить печень',
      description: 'Пить много спиртосодержащих напитков - пива, водки и прочего',
    },
    {
      id: 2,
      text: 'Вырастить пузо',
      description: 'Жрать много жирного, сладкого и жареного',
    },
    {
      id: 3,
      text: 'Построить тещу',
      description: 'Быть брутальным мачо, разговаривать грозным голосом сдвинув брови',
    },
  ];

  public add(toDoDto: ToDoDto) {
    const ids = this.toDoList.map(item => item.id);
    const maxId = ids.length > 0 ? Math.max(...ids) : 0;
    const newToDo = { ...toDoDto, id: maxId + 1 };
    this.toDoList.push(newToDo);
  }

  public getAll(): ToDos {
    return { items: this.toDoList };
  }

  public getById(id: number): ToDo | undefined {
    return this.toDoList.find(item => item.id === id);
  }

  public update(toDo: ToDo) {
    const index = this.toDoList.findIndex(item => item.id === toDo.id);
    this.toDoList[index] = toDo;
  }

  public removeById(id: number) {
    const index = this.toDoList.findIndex(item => item.id === id);
    if (index > -1) {
      this.toDoList.splice(index, 1);
    }
  }
}
