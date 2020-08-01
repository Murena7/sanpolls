import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'san-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
})
export class CountdownComponent implements OnInit, OnChanges {
  @Input() endDate: string;
  endMessage = 'Голосование завершилось';
  dateToNumber: number;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.dateToNumber  = new Date(this.endDate).getTime()/1000;
  }
}
