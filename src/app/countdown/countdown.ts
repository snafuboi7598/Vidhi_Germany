import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, style, animate, transition, keyframes } from '@angular/animations';

@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './countdown.html',
  styleUrl: './countdown.scss',
  animations: [
    trigger('swing', [
      transition('* => *', [
        animate('2s ease-in-out', keyframes([
          style({ transform: 'rotate(0deg)', offset: 0 }),
          style({ transform: 'rotate(15deg)', offset: 0.25 }),
          style({ transform: 'rotate(-10deg)', offset: 0.5 }),
          style({ transform: 'rotate(5deg)', offset: 0.75 }),
          style({ transform: 'rotate(0deg)', offset: 1 })
        ]))
      ])
    ]),
    trigger('pulseHeart', [
      transition('* => *', [
        animate('1s ease-in-out', keyframes([
          style({ transform: 'scale(1)', offset: 0 }),
          style({ transform: 'scale(1.2)', offset: 0.5 }),
          style({ transform: 'scale(1)', offset: 1 })
        ]))
      ])
    ])
  ]
})
export class Countdown implements OnInit, OnDestroy {
  targetDate: Date = new Date('2026-03-05T00:00:00'); // March 5th, 2026
  timeRemaining: any = {};
  isArrived: boolean = false;
  private intervalId: any;

  // Animation state triggers
  swingState = false;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.calculateTime();
    this.intervalId = setInterval(() => {
      this.calculateTime();
      // Trigger swing animation every second effectively
      this.swingState = !this.swingState;
      this.cdr.detectChanges(); // Manually trigger change detection
    }, 1000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  calculateTime() {
    const now = new Date().getTime();
    const distance = this.targetDate.getTime() - now;

    if (distance < 0) {
      this.isArrived = true;
      clearInterval(this.intervalId);
      this.timeRemaining = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    } else {
      this.isArrived = false;
      this.timeRemaining = {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      };
    }
  }
}
