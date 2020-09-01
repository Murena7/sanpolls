import { Component, Input, OnInit } from '@angular/core';
import { ISong } from '@core/interfaces/song/song.types';

@Component({
  selector: 'san-polls-short-table',
  templateUrl: './polls-short-table.component.html',
  styleUrls: ['./polls-short-table.component.scss']
})
export class PollsShortTableComponent {
  @Input() rowsData: ISong[] = [];
}
