import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogPollsComponent } from '@components/dialog-polls/dialog-polls.component';

@Component({
  selector: 'san-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss'],
})
export class PollComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog() {
    const dialogRef = this.dialog.open(DialogPollsComponent, {
      data: {
        song: 'Путин - Mutter (user: SanSan)',
        name: 'John',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
