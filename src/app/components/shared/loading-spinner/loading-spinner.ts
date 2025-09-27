import { Component, input, InputSignal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading-spinner',
  imports: [
    MatProgressSpinnerModule,
  ],
  templateUrl: './loading-spinner.html',
  styleUrl: './loading-spinner.scss',
})
export class LoadingSpinner {
  public readonly isLoading: InputSignal<boolean> = input.required<boolean>();
}
