import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { AdminApiService } from '@core/api-services/admin-api.service';
import { EventStatus, IPollEvent } from '@core/entities/poll-event/poll-event.types';
import { WindowSizeService } from '../../../core/common-services/window-size.service';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarNotificationService } from '@core/common-services/snackbar-notification.service';
import { WarnNotificationService } from '@core/common-services/warn-notification.service';
import { CreateEditComponent } from './modals/create-edit/create-edit.component';
import { ICreateEditModalData } from './polls.types';
import { ICreatePollBody } from '../../../core/entities/admin/admin.types';

@Component({
  templateUrl: './polls.component.html',
  styleUrls: ['./polls.component.scss'],
})
export class PollsComponent implements OnInit, OnDestroy {
  readonly headerHeight = 50;
  readonly rowHeight = 50;
  readonly resultLimit = 100;
  isLoading = false;
  isNoMoreResult = false;
  @ViewChild('pollsTable', { static: true }) pollTable: ElementRef;

  pollDataRows: IPollEvent[] = [];
  totalElements: number;
  ColumnMode = ColumnMode;
  filter = '';
  @ViewChild(DatatableComponent, { static: true }) table: DatatableComponent;

  eventStatus = EventStatus;

  constructor(
    private adminApiService: AdminApiService,
    public windowSizeService: WindowSizeService,
    public dialog: MatDialog,
    public snackbarNotificationService: SnackbarNotificationService,
    public warnNotificationService: WarnNotificationService
  ) {}

  ngOnInit(): void {
    this.loadPollsData();
  }

  ngOnDestroy(): void {
    this.warnNotificationService.hide();
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

  private checkActivePollCount(data: IPollEvent[]) {
    const activePolls = data.filter((poll) => poll.status === EventStatus.Active);
    if (activePolls.length > 1) {
      return this.warnNotificationService.show(
        'Больше одного Polls со статусом Active ! (допускается только 1 активный)'
      );
    }
    if (activePolls.length < 1) {
      return this.warnNotificationService.show('Нету ни одного активного Poll !');
    }
    return this.warnNotificationService.hide();
  }

  private loadPollsData(take = 100, skip = 0, disableLoader = false, appendData = false) {
    this.adminApiService
      .getAllPolls(
        {
          take,
          skip,
          filter: this.filter === '' ? undefined : this.filter,
        },
        disableLoader
      )
      .subscribe((res) => {
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

        this.checkActivePollCount(this.pollDataRows);
      });
  }

  switchPollStatus(row: IPollEvent) {
    this.adminApiService.switchPollStatus(row.id).subscribe((res) => {
      row.status = res.data.status;
      this.snackbarNotificationService.successfully('Статус изменен');
      this.checkActivePollCount(this.pollDataRows);
    });
  }

  openCreatePollDialog() {
    const dialogRef = this.dialog.open(CreateEditComponent, {
      minWidth: '500px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const data: ICreatePollBody = result;
        this.adminApiService.createNewPoll(data).subscribe(
          (res) => {
            this.snackbarNotificationService.successfully('Новое голосование создано');
            this.loadPollsData();
          },
          (error) => {
            this.snackbarNotificationService.error('Ошибка - голосование не создано');
          }
        );
      }
    });
  }

  openEditPollDialog(row: IPollEvent) {
    const modalData: ICreateEditModalData = {
      isEdit: true,
      data: row,
    };
    const dialogRef = this.dialog.open(CreateEditComponent, {
      minWidth: '500px',
      data: modalData,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const data: ICreatePollBody = result;
        this.adminApiService.editPoll(data, row.id).subscribe(
          (res) => {
            this.snackbarNotificationService.successfully('Изменения сохранены');
            this.loadPollsData();
          },
          (error) => {
            this.snackbarNotificationService.error('Изменения не сохранены');
          }
        );
      }
    });
  }
}
