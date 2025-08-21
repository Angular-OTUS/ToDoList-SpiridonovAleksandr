import { Component } from '@angular/core';

@Component({
  selector: 'app-to-do-list',
  imports: [],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.scss'
})
export class ToDoList {
  protected readonly toDoList = [
    'Посадить печень',
    'Вырастить пузо',
    'Построить тещу'
  ];
}
