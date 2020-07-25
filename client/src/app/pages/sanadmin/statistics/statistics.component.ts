import { Component, OnInit } from '@angular/core';
import { AdminApiService } from '@core/api-services/admin-api.service';
import { IStatisticTotal } from '@core/entities/statistic/statistic.types';

@Component({
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  data: IStatisticTotal;

  constructor(private adminApiService: AdminApiService) {}

  ngOnInit(): void {
    this.adminApiService.getStatisticTotal().subscribe(res => {
      this.data = res;
    });
  }
}
