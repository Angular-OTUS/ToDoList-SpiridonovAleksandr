import { Component, input, InputSignal } from '@angular/core';
import { Button } from '../button/button';

@Component({
  selector: 'app-header',
  imports: [
    Button
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
}
