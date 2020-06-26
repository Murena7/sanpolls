import { Component, OnInit } from '@angular/core';
import { PollsService } from '@core/services/polls.service';
import { IPoll } from '@core/polls/polls.types';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'san-polls',
  templateUrl: './polls.component.html',
  styleUrls: ['./polls.component.scss'],
})
export class PollsComponent implements OnInit {
  pollsTableData: IPoll[] = [];
  pollsTableLoader = false;

  constructor(private apiService: PollsService, private ngxLoader: NgxUiLoaderService) {}

  ngOnInit(): void {
    this.ngxLoader.start();
    this.apiService.getPolls().subscribe((res) => {
      this.pollsTableData = res;
      this.ngxLoader.stop();
    });
  }

  pollsTablePagination(limit: number) {
    // set the loading flag, which serves two purposes:
    // 1) it prevents the same page from being loaded twice
    // 2) it enables display of the loading indicator
    this.pollsTableLoader = true;

    this.apiService.getPolls().subscribe((res) => {
      this.pollsTableData = [...this.pollsTableData, ...res];
      this.pollsTableLoader = false;
    });
  }
}
