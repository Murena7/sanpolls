import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IPoll } from '@core/entities/polls/polls.types';

@Component({
  selector: 'san-polls-table',
  templateUrl: './polls-table.component.html',
  styleUrls: ['./polls-table.component.scss']
})
export class PollsTableComponent implements OnInit {
  @Input() rows: IPoll[] = [];
  @Input() isLoading = false;
  @Output() pagination = new EventEmitter<number>();

  readonly headerHeight = 50;
  readonly rowHeight = 50;
  readonly pageLimit = 60;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.onScroll(0);
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
      this.pagination.emit(limit);
    }
  }
}
