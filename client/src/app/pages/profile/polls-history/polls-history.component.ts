import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PollsService } from '@core/api-services/polls.service';
import { ISong } from '@core/entities/song/song.types';
import { IPollEvent } from '../../../core/entities/poll-event/poll-event.types';
import { WindowSizeService } from '../../../core/common-services/window-size.service';
import { IPollsTablePagination } from '../../polls/polls.types';
import { Subscription } from 'rxjs';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'san-polls-history',
  templateUrl: './polls-history.component.html',
  styleUrls: ['./polls-history.component.scss'],
})
export class PollsHistoryComponent implements OnInit, OnDestroy {
  pollsSongList: ISong[] = [];
  eventPoll: IPollEvent[] = [];
  selectedPoll = '';
  isSomeSelected = false;
  isLoading = false;
  totalRatingListElements: number;
  isNoMoreTableResult = false;

  readonly headerHeight = 50;
  readonly rowHeight = 50;
  readonly pageLimit = 60;

  windowSizeSub: Subscription;
  isSmall = false;

  @ViewChild('pollsTable', { static: true }) table: ElementRef;
  @ViewChild(DatatableComponent, { static: false }) tableData: DatatableComponent;

  constructor(private pollsService: PollsService, public windowSizeService: WindowSizeService) {}

  ngOnInit(): void {
    this.pollsService.getAllArchivedPoll().subscribe((res) => {
      this.eventPoll = res.data;
    });

    this.initWindowSize();
  }

  ngOnDestroy() {
    this.windowSizeSub.unsubscribe();
  }

  toggleExpandRow(row) {
    this.tableData.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
  }

  initWindowSize() {
    this.windowSizeSub = this.windowSizeService.windowSizeChanged.subscribe((res) => {
      res.width <= 825 ? (this.isSmall = true) : (this.isSmall = false);
    });
  }

  selectionChange() {
    this.pollsService.getPolls({ id: this.selectedPoll }).subscribe((res) => {
      this.pollsSongList = res.data;
      this.totalRatingListElements = res.count;
      this.isSomeSelected = true;
      this.isNoMoreTableResult = false;
      this.isLoading = false;
    });
  }

  onScroll(offsetY: number) {
    const viewHeight = this.table.nativeElement.getBoundingClientRect().height - this.headerHeight;

    if (
      !this.isLoading &&
      !this.isNoMoreTableResult &&
      offsetY + viewHeight >= this.pollsSongList.length * this.rowHeight
    ) {
      const limit = this.pageLimit;
      this.pollsTablePagination({
        take: limit,
        skip: this.pollsSongList.length,
        disableLoader: true,
        appendData: true,
      });
    }
  }

  pollsTablePagination(params: IPollsTablePagination) {
    this.isLoading = true;

    this.pollsService
      .getPolls(
        {
          id: params.id,
          take: params.take,
          skip: params.skip,
        },
        params.disableLoader
      )
      .subscribe((res) => {
        if (params.appendData) {
          this.pollsSongList = [...this.pollsSongList, ...res.data];
        } else {
          this.pollsSongList = res.data;
        }

        this.totalRatingListElements = res.count;
        this.isLoading = false;

        if (res.data.length <= 0) {
          this.isNoMoreTableResult = true;
        } else {
          this.isNoMoreTableResult = false;
        }
      });
  }
}
