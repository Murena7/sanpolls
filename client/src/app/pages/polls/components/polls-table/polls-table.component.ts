import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ISong} from '@core/entities/song/song.types';
import {IUser} from '@core/entities/user/user.types';
import {IPollsTablePagination} from '@pages/polls/polls.types';
import {WindowSizeService} from '../../../../core/common-services/window-size.service';
import {Router} from '@angular/router';
import {DatatableComponent} from '@swimlane/ngx-datatable';

@Component({
  selector: 'san-polls-table',
  templateUrl: './polls-table.component.html',
  styleUrls: ['./polls-table.component.scss'],
})
export class PollsTableComponent implements OnInit {
  @Input() rows: ISong[] = [];
  @Input() currentUser: IUser;
  @Input() isLoading = false;
  @Input() isNoMoreResult = false;
  @Input() isSmall: boolean;
  @Output() pagination = new EventEmitter<IPollsTablePagination>();
  @Output() vote = new EventEmitter<ISong>();

  readonly headerHeight = 50;
  readonly rowHeight = 50;
  readonly pageLimit = 60;

  @ViewChild('pollsTable', {static: true}) table: ElementRef;
  @ViewChild(DatatableComponent, {static: true}) tableData: DatatableComponent;

  constructor(public windowSizeService: WindowSizeService, private router: Router) {
  }

  ngOnInit() {
    this.onScroll(0);
  }

  onScroll(offsetY: number) {
    const viewHeight = this.table.nativeElement.getBoundingClientRect().height - this.headerHeight;

    if (!this.isLoading && !this.isNoMoreResult && offsetY + viewHeight >= this.rows.length * this.rowHeight) {
      const limit = this.pageLimit;
      this.pagination.emit({
        take: limit,
        skip: this.rows.length,
        disableLoader: true,
        appendData: true,
      });
    }
  }

  openDialog(song: ISong) {
    this.vote.emit(song);
  }

  selectedRowClass(row: ISong) {
    if (this.currentUser && row.userId === this.currentUser.id) {
      return {
        'highlight-song': true,
        'row-cursor': true,
      };
    } else {
      return {
        'row-cursor': true,
      };
    }
  }

  rowClick(event: any) {
    if (event.type === 'click' && event.column.name !== 'Голосовать' && event.column.name !== '') {
      this.router.navigate(['/song', event.row.id]);
    }
  }

  onDetailToggle(event) {
  }

  toggleExpandRow(row) {
    this.tableData.rowDetail.toggleExpandRow(row);
  }
}
