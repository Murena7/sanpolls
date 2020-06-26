import { Component, OnInit } from '@angular/core';
import { PollsService } from '@core/services/polls.service';
import { IPoll } from '@core/polls/polls.types';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'san-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  polls: IPoll[] = [];

  constructor(private apiService: PollsService, private ngxLoader: NgxUiLoaderService) {}

  ngOnInit(): void {
    this.ngxLoader.start();
    this.apiService.getPolls().subscribe((res) => {
      this.polls = res;
      this.ngxLoader.stop();
    });
  }
}
