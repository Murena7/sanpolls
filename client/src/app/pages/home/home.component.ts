import { Component, OnInit } from '@angular/core';
import { PollsService } from '@core/services/polls.service';

@Component({
  selector: 'san-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private apiService: PollsService) {}

  ngOnInit(): void {
    this.apiService.getPolls();
  }
}
