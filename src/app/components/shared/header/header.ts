import { Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  public tab: InputSignal<string> = input.required<string>();
}
