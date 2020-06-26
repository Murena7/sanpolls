import { Component, Input, OnInit } from '@angular/core';
import { IPoll } from '@core/polls/polls.types';

@Component({
  selector: 'san-polls-short-table',
  templateUrl: './polls-short-table.component.html',
  styleUrls: ['./polls-short-table.component.scss'],
})
export class PollsShortTableComponent {
  @Input() rowsData: IPoll[] = [];
}
