import { Component, OnInit } from '@angular/core';
import { PollsService } from '@core/api-services/polls.service';
import { IPoll } from '@core/entities/polls/polls.types';

@Component({
  selector: 'san-polls',
  templateUrl: './polls.component.html',
  styleUrls: ['./polls.component.scss']
})
export class PollsComponent implements OnInit {
  pollsTableData: IPoll[] = [];
  pollsTableLoader = false;

  constructor(private apiService: PollsService) {}

  ngOnInit(): void {
    this.apiService.getPolls().subscribe(res => {
      this.pollsTableData = res;
    });
  }

  pollsTablePagination(limit: number) {
    // set the loading flag, which serves two purposes:
    // 1) it prevents the same page from being loaded twice
    // 2) it enables display of the loading indicator
    this.pollsTableLoader = true;

    this.apiService.getPolls().subscribe(res => {
      this.pollsTableData = [...this.pollsTableData, ...res];
      this.pollsTableLoader = false;
    });
  }
}
