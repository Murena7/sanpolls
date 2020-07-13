import { Component, OnInit, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { IUser } from '@core/entities/user/user.types';

@Component({
  templateUrl: './polls.component.html',
  styleUrls: ['./polls.component.scss']
})
export class PollsComponent implements OnInit {
  usersData: IUser[] = [];
  ColumnMode = ColumnMode;
  columns = [{ prop: 'name' }, { name: 'Company' }, { name: 'Gender' }];
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor() {}

  ngOnInit(): void {}

  updateFilter(event: any) {}
}
