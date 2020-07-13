import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogPollsComponent } from '@components/dialog-polls/dialog-polls.component';
import { switchMap, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PollsService } from '@core/api-services/polls.service';
import { ISong } from '@core/entities/song/song.types';

@Component({
  selector: 'san-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss']
})
export class PollComponent implements OnInit {
  poll$: Observable<ISong>;

  constructor(private dialog: MatDialog, private pollService: PollsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.poll$ = this.route.params.pipe(
      switchMap(params => {
        return this.pollService.getPollById(params.id);
      })
    );
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogPollsComponent, {
      data: {
        song: 'Путин - Mutter (user: SanSan)',
        name: 'John'
      }
    });

    dialogRef.afterClosed().subscribe(result => {});
  }
}
