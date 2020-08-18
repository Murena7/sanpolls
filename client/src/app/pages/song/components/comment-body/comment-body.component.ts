import { Component, Input, OnInit } from '@angular/core';
import { IComment } from '../../../../core/entities/comment/comment';
import { IChildComment } from '../../../../core/entities/child-comment/child-comment';
import { IUser } from '../../../../core/entities/user/user.types';

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
