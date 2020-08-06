import {Component, OnInit, ViewChild} from '@angular/core';
import { ISong } from '@core/entities/song/song.types';
import { UserService } from '../../../core/api-services/user.service';
import { WindowSizeService } from '../../../core/api-services/window-size.service';
import {ColumnMode, DatatableComponent} from '@swimlane/ngx-datatable';

@Component({
  selector: 'san-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  songs: ISong[] = [];
  ColumnMode = ColumnMode;
  readonly headerHeight = 50;
  readonly rowHeight = 50;
  @ViewChild(DatatableComponent, { static: true }) table: DatatableComponent;

  constructor(private userService: UserService, public windowSizeService: WindowSizeService) {}

  ngOnInit() {
    this.userService.userSongHistory().subscribe((res) => {
      this.songs = res;
    });
  }

  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {}
}
