import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Modal {
  public isVisible: InputSignal<boolean> = input.required<boolean>();
  protected closeEvent: OutputEmitterRef<void> = output<void>();

  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.isVisible()) {
      this.close();
    }
  }

  close() {
    this.closeEvent.emit();
  }

  onOverlayClick() {
    this.close();
  }
}
