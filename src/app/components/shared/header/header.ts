import { Component, output, OutputEmitterRef, signal, WritableSignal } from '@angular/core';
import { Button } from '../button/button';
import { Modal } from '../modal/modal';
import { ToDoCreateItem } from '../../modules/to-do-create-item/to-do-create-item';
import { ToDoDto } from '../../../model/to-do';

@Component({
  selector: 'app-header',
  imports: [
    Button,
    Modal,
    ToDoCreateItem
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  protected showModal: WritableSignal<boolean> = signal<boolean>(false);
  protected taskToAdd: OutputEmitterRef<ToDoDto> = output<ToDoDto>();

  onTaskAdded(task: ToDoDto) {
    this.taskToAdd.emit(task);
    this.showModal.set(false);
  }
}
