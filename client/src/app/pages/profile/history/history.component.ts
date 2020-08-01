import { Component, OnInit } from '@angular/core';
import { ISong } from '@core/entities/song/song.types';
import { PollsService } from '@core/api-services/polls.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'san-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  songs: ISong[] = [];

  constructor(private apiService: PollsService) {}

  ngOnInit() {
    this.apiService
      .getActivePoll()
      .pipe(
        switchMap(activeEvent => {
          return this.apiService.getPolls({ id: activeEvent.id });
        })
      )
      .subscribe(res => (this.songs = res.data));
  }
}
