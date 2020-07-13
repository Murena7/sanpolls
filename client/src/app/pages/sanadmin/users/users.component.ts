import { Component, OnInit, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { IUser } from '@core/entities/user/user.types';

@Component({
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  usersData: IUser[] = [];
  ColumnMode = ColumnMode;
  columns = [{ prop: 'name' }, { name: 'Company' }, { name: 'Gender' }];
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor() {}

  ngOnInit(): void {}

  updateFilter(event: any) {}
}
