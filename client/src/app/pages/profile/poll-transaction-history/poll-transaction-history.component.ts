import { Component, OnInit, ViewChild } from '@angular/core';
import { ISong } from '../../../core/entities/song/song.types';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { UserService } from '../../../core/api-services/user.service';
import { WindowSizeService } from '../../../core/api-services/window-size.service';
import { IPollTransaction } from '../../../core/entities/poll-transaction/poll-transaction.types';

@Component({
  selector: 'san-poll-transaction-history',
  templateUrl: './poll-transaction-history.component.html',
  styleUrls: ['./poll-transaction-history.component.scss'],
})
export class PollTransactionHistoryComponent implements OnInit {
  pollTransaction: IPollTransaction[] = [];
  ColumnMode = ColumnMode;
  readonly headerHeight = 50;
  readonly rowHeight = 50;
  @ViewChild(DatatableComponent, { static: true }) table: DatatableComponent;

  constructor(private userService: UserService, public windowSizeService: WindowSizeService) {}

  ngOnInit() {
    this.userService.userPollTransactionHistory().subscribe((res) => {
      this.pollTransaction = res;
    });
  }

  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {}
}
