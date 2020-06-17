import { Component, ElementRef, OnInit } from '@angular/core';
import { PollsService } from '@core/services/polls.service';
import { IPoll } from '@core/polls/polls.types';

@Component({
  selector: 'san-polls-table',
  templateUrl: './polls-table.component.html',
  styleUrls: ['./polls-table.component.scss'],
})
export class PollsTableComponent implements OnInit {
  rows: IPoll[] = [];

  readonly headerHeight = 50;
  readonly rowHeight = 50;
  readonly pageLimit = 60;

  isLoading: boolean;

  constructor(private apiService: PollsService, private el: ElementRef) {}

  ngOnInit() {
    this.onScroll(0);

    this.apiService.getPolls().subscribe((res) => {
      this.rows = res.data;
    });
  }

  onScroll(offsetY: number) {
    // total height of all rows in the viewport
    const viewHeight = this.el.nativeElement.getBoundingClientRect().height - this.headerHeight;

    // check if we scrolled to the end of the viewport
    if (!this.isLoading && offsetY + viewHeight >= this.rows.length * this.rowHeight) {
      // total number of results to load
      let limit = this.pageLimit;

      // check if we haven't fetched any results yet
      if (this.rows.length === 0) {
        // calculate the number of rows that fit within viewport
        const pageSize = Math.ceil(viewHeight / this.rowHeight);

        // change the limit to pageSize such that we fill the first page entirely
        // (otherwise, we won't be able to scroll past it)
        limit = Math.max(pageSize, this.pageLimit);
      }
      this.loadPage(limit);
    }
  }

  private loadPage(limit: number) {
    // set the loading flag, which serves two purposes:
    // 1) it prevents the same page from being loaded twice
    // 2) it enables display of the loading indicator
    this.isLoading = true;

    this.apiService.getPolls().subscribe((res) => {
      const rows = [...this.rows, ...res.data];
      this.rows = rows;
      this.isLoading = false;
    });
  }
}
