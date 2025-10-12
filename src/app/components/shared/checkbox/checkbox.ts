import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  InputSignal,
  OnChanges,
  OnDestroy,
  output,
  OutputEmitterRef,
  Signal,
} from '@angular/core';

@Component({
  selector: 'app-checkbox',
  imports: [],
  templateUrl: './checkbox.html',
  styleUrl: './checkbox.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Checkbox implements AfterViewInit, OnChanges, OnDestroy {
  private readonly elementRef: ElementRef = inject(ElementRef);
  private syncTimeout: number | null = null;

  public readonly itemId: InputSignal<number> = input.required<number>();
  public readonly isChecked: InputSignal<boolean> = input.required<boolean>();
  protected checkboxId: Signal<string> = computed(() => `checkbox_${this.itemId()}`);
  protected checked: OutputEmitterRef<Event> = output<Event>();

  ngAfterViewInit(): void {
    this.syncCheckboxState();
  }

  ngOnChanges(): void {
    this.syncCheckboxState();
  }

  private syncCheckboxState(): void {
    if (this.syncTimeout !== null) {
      clearTimeout(this.syncTimeout);
    }

    this.syncTimeout = setTimeout(() => {
      const input = this.elementRef.nativeElement.querySelector('input[type="checkbox"]');
      if (input) {
        input.checked = this.isChecked();
      }
      this.syncTimeout = null;
    }) as unknown as number;
  }

  ngOnDestroy(): void {
    if (this.syncTimeout !== null) {
      clearTimeout(this.syncTimeout);
    }
  }
}
