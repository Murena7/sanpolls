import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'san-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
})
export class CountdownComponent implements OnInit {
  timeLeft = {
    leftTime: 60480,
  };

  constructor() {}
  ngOnInit(): void {}
}
