import { Component, OnInit } from '@angular/core';
import { IPoll } from '@core/polls/polls.types';
import { PollsService } from '@core/services/polls.service';

@Component({
  selector: 'san-polls-short-table',
  templateUrl: './polls-short-table.component.html',
  styleUrls: ['./polls-short-table.component.scss'],
})
export class PollsShortTableComponent implements OnInit {
  rowsData: IPoll[] = [];
  constructor(private apiService: PollsService) {}

  ngOnInit(): void {
    this.apiService.getPolls().subscribe((res) => {
      this.rowsData = res.data;
    });
  }
}
