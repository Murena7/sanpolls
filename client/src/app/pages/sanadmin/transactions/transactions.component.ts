import { Component, OnInit, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { IUser } from '@core/entities/user/user.types';

@Component({
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  usersData: IUser[] = [];
  ColumnMode = ColumnMode;
  columns = [{ prop: 'name' }, { name: 'Company' }, { name: 'Gender' }];
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor() {}

  ngOnInit(): void {}

  updateFilter(event: any) {}
}
