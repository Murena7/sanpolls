import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'san-short-history-table',
  templateUrl: './short-history-table.component.html',
  styleUrls: ['./short-history-table.component.scss'],
})
export class ShortHistoryTableComponent implements OnInit {
  historyData = [{ title: 'Путин - Ветер северный' }, { title: 'Rammstein - Muter' }, { title: 'Rammstein - Sonne' }];

  ngOnInit(): void {}
}
