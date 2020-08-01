import { Component, Input, OnInit } from '@angular/core';
import { IComment } from '@pages/song/components/comments/comments.component';

@Component({
  selector: 'san-child-comments',
  templateUrl: './child-comments.component.html',
  styleUrls: ['./child-comments.component.scss'],
})
export class ChildCommentsComponent implements OnInit {
  @Input() childComments: IComment[];
  @Input() panelOpenState = false;

  constructor() {}

  ngOnInit() {}
}
