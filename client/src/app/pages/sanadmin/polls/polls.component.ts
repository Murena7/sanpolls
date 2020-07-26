import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { AdminApiService } from '@core/api-services/admin-api.service';
import { IPollEvent } from '@core/entities/poll-event/poll-event.types';
import { WindowSizeService } from '@core/api-services/window-size.service';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarNotificationService } from '@core/common-services/snackbar-notification.service';

@Component({
  templateUrl: './polls.component.html',
  styleUrls: ['./polls.component.scss']
})
export class PollsComponent implements OnInit {
  readonly headerHeight = 50;
  readonly rowHeight = 50;
  readonly resultLimit = 20;
  isLoading = false;
  isNoMoreResult = false;
  @ViewChild('pollsTable') pollTable: ElementRef;

  pollDataRows: IPollEvent[] = [];
  totalElements: number;
  ColumnMode = ColumnMode;
  filter = '';
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(
    private adminApiService: AdminApiService,
    public windowSizeService: WindowSizeService,
    public dialog: MatDialog,
    public snackbarNotificationService: SnackbarNotificationService
  ) {}

  ngOnInit(): void {
    this.loadPollsData();
  }

  updateFilter() {
    this.loadPollsData();
  }

  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {}

  onScroll(offsetY: number) {
    const viewHeight = this.pollTable.nativeElement.getBoundingClientRect().height - this.headerHeight;
    if (!this.isLoading && !this.isNoMoreResult && offsetY + viewHeight >= this.pollDataRows.length * this.rowHeight) {
      const limit = this.resultLimit;
      this.loadPage(limit);
    }
  }

  private loadPage(limit: number) {
    this.isLoading = true;
    this.loadPollsData(limit, this.pollDataRows.length, true, true);
  }

  private loadPollsData(take = 20, skip = 0, disableLoader = false, appendData = false) {
    this.adminApiService
      .getAllPolls(
        {
          take,
          skip,
          filter: this.filter === '' ? undefined : this.filter
        },
        disableLoader
      )
      .subscribe(res => {
        if (appendData) {
          this.pollDataRows = [...this.pollDataRows, ...res.data];
        } else {
          this.pollDataRows = res.data;
        }

        this.totalElements = res.count;
        this.isLoading = false;

        if (res.data.length <= 0) {
          this.isNoMoreResult = true;
        } else {
          this.isNoMoreResult = false;
        }
      });
  }
}
