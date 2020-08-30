import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ISong } from '@core/entities/song/song.types';
import { UserService } from '../../../core/api-services/user.service';
import { WindowSizeService } from '../../../core/api-services/window-size.service';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { Subscription } from 'rxjs';

@Component({
  selector: 'san-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit, OnDestroy {
  songs: ISong[] = [];
  ColumnMode = ColumnMode;
  readonly headerHeight = 50;
  readonly rowHeight = 50;
  @ViewChild(DatatableComponent, { static: true }) table: DatatableComponent;

  windowSizeSub: Subscription;
  isSmall = false;

  constructor(private userService: UserService, public windowSizeService: WindowSizeService) {}

  ngOnInit() {
    this.userService.userSongHistory().subscribe((res) => {
      this.songs = res;
    });

    this.initWindowSize();
  }

  ngOnDestroy() {
    this.windowSizeSub.unsubscribe();
  }

  initWindowSize() {
    this.windowSizeSub = this.windowSizeService.windowSizeChanged.subscribe((res) => {
      res.width <= 825 ? (this.isSmall = true) : (this.isSmall = false);
    });
  }

  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {}
}
