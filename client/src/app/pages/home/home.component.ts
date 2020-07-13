import { Component, OnInit } from '@angular/core';
import { PollsService } from '@core/api-services/polls.service';
import { ISong } from '@core/entities/song/song.types';

@Component({
  selector: 'san-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  polls: ISong[] = [];

  constructor(private apiService: PollsService) {}

  ngOnInit(): void {
    this.apiService.getPolls().subscribe(res => {
      this.polls = res;
    });
  }
}
