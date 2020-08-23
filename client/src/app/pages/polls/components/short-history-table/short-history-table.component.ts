import { Component, Input, OnInit } from '@angular/core';
import { IUser } from '../../../../core/entities/user/user.types';
import { ISong } from '../../../../core/entities/song/song.types';

@Component({
  selector: 'san-short-history-table',
  templateUrl: './short-history-table.component.html',
  styleUrls: ['./short-history-table.component.scss'],
})
export class ShortHistoryTableComponent implements OnInit {
  @Input() songData: ISong[];

  ngOnInit(): void {}
}
