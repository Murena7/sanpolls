import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '@core/entities/user/user.models';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  templateUrl: './polls.component.html',
  styleUrls: ['./polls.component.scss']
})
export class PollsComponent implements OnInit {
  usersData: User[] = [];
  ColumnMode = ColumnMode;
  columns = [{ prop: 'name' }, { name: 'Company' }, { name: 'Gender' }];
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor() {}

  ngOnInit(): void {}

  updateFilter(event: any) {}
}
