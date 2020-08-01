import { Component, OnInit } from '@angular/core';
import { PollsService } from '@core/api-services/polls.service';
import { ISong } from '@core/entities/song/song.types';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'san-polls-history',
  templateUrl: './polls-history.component.html',
  styleUrls: ['./polls-history.component.scss']
})
export class PollsHistoryComponent implements OnInit {
  polls: ISong[] = [];
  selectedPoll = '';

  constructor(private apiService: PollsService) {}

  ngOnInit(): void {
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
