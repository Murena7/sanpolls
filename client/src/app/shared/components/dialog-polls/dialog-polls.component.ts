import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'san-dialog-polls',
  templateUrl: './dialog-polls.component.html',
  styleUrls: ['./dialog-polls.component.scss'],
})
export class DialogPollsComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {}
}
