import { Component, Input, OnInit } from '@angular/core';
import { IComment } from '../../../../core/interfaces/comment/comment';
import { IChildComment } from '../../../../core/interfaces/child-comment/child-comment';
import { IUser } from '../../../../core/interfaces/user/user.types';

@Component({
  selector: 'san-comment-body',
  templateUrl: './comment-body.component.html',
  styleUrls: ['./comment-body.component.scss'],
})
export class CommentBodyComponent implements OnInit {
  @Input() comment: IComment | IChildComment;
  @Input() currentUser: IUser;

  constructor() {}

  ngOnInit(): void {}
}
