import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { AdminApiService } from '@core/api-services/admin-api.service';
import { WindowSizeService } from '../../../core/common-services/window-size.service';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarNotificationService } from '@core/common-services/snackbar-notification.service';
import { IPollTransaction } from '@core/entities/poll-transaction/poll-transaction.types';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  readonly headerHeight = 50;
  readonly rowHeight = 50;
  readonly resultLimit = 20;
  isLoading = false;
  isNoMoreResult = false;
  @ViewChild('transactionTable', { static: true }) transactionTable: ElementRef;

  transactionDataRows: IPollTransaction[] = [];
  totalElements: number;
  ColumnMode = ColumnMode;
  filter = '';
  @ViewChild(DatatableComponent, { static: true }) table: DatatableComponent;

  constructor(
    private adminApiService: AdminApiService,
    public windowSizeService: WindowSizeService,
    public dialog: MatDialog,
    public snackbarNotificationService: SnackbarNotificationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.queryParams?.filter) {
      this.filter = this.route.snapshot.queryParams?.filter;
    }

    this.loadTransactionData();
  }

  updateFilter() {
    this.loadTransactionData();
  }

  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {}

  onScroll(offsetY: number) {
    const viewHeight = this.transactionTable.nativeElement.getBoundingClientRect().height - this.headerHeight;
    if (
      !this.isLoading &&
      !this.isNoMoreResult &&
      offsetY + viewHeight >= this.transactionDataRows.length * this.rowHeight
    ) {
      const limit = this.resultLimit;
      this.loadPage(limit);
    }
  }

  private loadPage(limit: number) {
    this.isLoading = true;
    this.loadTransactionData(limit, this.transactionDataRows.length, true, true);
  }

  private loadTransactionData(take = 20, skip = 0, disableLoader = false, appendData = false) {
    this.adminApiService
      .getAllTransactions(
        {
          take,
          skip,
          filter: this.filter === '' ? undefined : this.filter
        },
        disableLoader
      )
      .subscribe(res => {
        if (appendData) {
          this.transactionDataRows = [...this.transactionDataRows, ...res.data];
        } else {
          this.transactionDataRows = res.data;
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
