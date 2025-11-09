import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-empty-list',
  imports: [],
  templateUrl: './empty-list.html',
  styleUrl: './empty-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmptyList {

}
