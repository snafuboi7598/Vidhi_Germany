import { Component } from '@angular/core';
import { Countdown } from './countdown/countdown';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Countdown],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
}
