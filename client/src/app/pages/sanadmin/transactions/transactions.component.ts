import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '@core/user/user.models';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  usersData: User[] = [];
  ColumnMode = ColumnMode;
  columns = [{ prop: 'name' }, { name: 'Company' }, { name: 'Gender' }];
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor() {}

  ngOnInit(): void {}

  updateFilter(event: any) {}
}
