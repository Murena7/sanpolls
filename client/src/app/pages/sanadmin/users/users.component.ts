import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { IUser } from '@core/entities/user/user.types';
import { AdminApiService } from '@core/api-services/admin-api.service';
import { WindowSizeService } from '@core/api-services/window-size.service';
import { MatDialog } from '@angular/material/dialog';
import { AddVoiceComponent } from '@pages/sanadmin/users/modals/add-voice/add-voice.component';
import { IAddVoiceModalResult } from '@pages/sanadmin/users/modals/add-voice/add-voice.types';
import { SnackbarNotificationService } from '@core/common-services/snackbar-notification.service';
import { UserService } from '@core/api-services/user.service';
import { switchMap } from 'rxjs/operators';

@Component({
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  readonly headerHeight = 50;
  readonly rowHeight = 50;
  readonly resultLimit = 20;
  isLoading = false;
  isNoMoreResult = false;
  @ViewChild('userTable', { static: true }) userTable: ElementRef;

  usersDataRows: IUser[] = [];
  totalElements: number;
  ColumnMode = ColumnMode;
  filter = '';
  @ViewChild(DatatableComponent, { static: true }) table: DatatableComponent;

  constructor(
    private adminApiService: AdminApiService,
    public windowSizeService: WindowSizeService,
    public dialog: MatDialog,
    public snackbarNotificationService: SnackbarNotificationService,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  addVoice(row: IUser) {
    const dialogRef = this.dialog.open(AddVoiceComponent, {
      width: '500px',
      data: row
    });

    dialogRef.afterClosed().subscribe((result: IAddVoiceModalResult) => {
      if (result) {
        this.adminApiService
          .addVoice({
            userId: result.user.id,
            amount: result.amount
          })
          .pipe(switchMap(res => this.userService.refreshUserData()))
          .subscribe(res => {
            const index = this.usersDataRows.findIndex(user => user.id === result.user.id);
            this.usersDataRows[index].voiceBalance += result.amount;
            this.snackbarNotificationService.successfully('Голоса Добавлены');
          });
      }
    });
  }

  updateFilter() {
    this.loadUserData();
  }

  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {}

  onScroll(offsetY: number) {
    const viewHeight = this.userTable.nativeElement.getBoundingClientRect().height - this.headerHeight;
    if (!this.isLoading && !this.isNoMoreResult && offsetY + viewHeight >= this.usersDataRows.length * this.rowHeight) {
      const limit = this.resultLimit;
      this.loadPage(limit);
    }
  }

  private loadPage(limit: number) {
    this.isLoading = true;
    this.loadUserData(limit, this.usersDataRows.length, true, true);
  }

  private loadUserData(take = 20, skip = 0, disableLoader = false, appendData = false) {
    this.adminApiService
      .getAllUsers(
        {
          take,
          skip,
          filter: this.filter === '' ? undefined : this.filter
        },
        disableLoader
      )
      .subscribe(res => {
        if (appendData) {
          this.usersDataRows = [...this.usersDataRows, ...res.data];
        } else {
          this.usersDataRows = res.data;
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
