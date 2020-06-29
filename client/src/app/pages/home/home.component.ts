import { Component, OnInit } from '@angular/core';
import { PollsService } from '@core/api-services/polls.service';
import { IPoll } from '@core/polls/polls.types';

@Component({
  selector: 'san-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  polls: IPoll[] = [];

  constructor(private apiService: PollsService) {}

  ngOnInit(): void {
    this.apiService.getPolls().subscribe((res) => {
      this.polls = res;
    });
  }
}
