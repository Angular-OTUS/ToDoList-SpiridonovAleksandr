import { Directive, ElementRef, HostListener, inject, input, InputSignal, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appTooltip]',
})
export class Tooltip implements OnDestroy {
  public appTooltip: InputSignal<string> = input.required<string>();
  private elementRef: ElementRef = inject(ElementRef);
  private tooltipElement: HTMLDivElement | null = null;

  @HostListener('mouseenter') onMouseEnter() {
    this.showTooltip();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.hideTooltip();
  }

  ngOnDestroy(): void {
    this.hideTooltip();
  }

  private showTooltip(): void {
    const nativeElement = this.elementRef.nativeElement as HTMLElement;
    const rect = nativeElement.getBoundingClientRect();
    const newElement = document.createElement('div');
    newElement.classList.add('tooltip');
    newElement.style.position = 'absolute';
    newElement.style.top = `${rect.top - newElement.offsetHeight - 40}px`;
    newElement.style.left = `${rect.left}px`;
    newElement.style.backgroundColor = '#333';
    newElement.style.color = '#fff';
    newElement.style.padding = '8px';
    newElement.style.borderRadius = '4px';
    newElement.textContent = this.appTooltip();

    this.tooltipElement = newElement;
    document.body.appendChild(newElement);
  }

  private hideTooltip(): void {
    if (this.tooltipElement && this.tooltipElement.parentNode) {
      this.tooltipElement.parentNode.removeChild(this.tooltipElement);
      this.tooltipElement = null;
    }
  }
}
