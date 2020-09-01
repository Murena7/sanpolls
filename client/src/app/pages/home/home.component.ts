import { Component, OnInit } from '@angular/core';
import { PollsService } from '@core/api-services/polls.service';
import { ISong } from '@core/interfaces/song/song.types';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'san-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  polls: ISong[] = [];

  constructor(private apiService: PollsService) {}

  ngOnInit() {
    this.apiService
      .getActivePoll()
      .pipe(
        switchMap(activeEvent => {
          return this.apiService.getPolls({ id: activeEvent.id });
        })
      )
      .subscribe(res => (this.polls = res.data));
  }
}
