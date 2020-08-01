import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'san-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.scss'],
})
export class LikeComponent implements OnInit {
  like = 100;
  dislike = 1;

  constructor() {}

  ngOnInit(): void {}

  likePoll() {
    this.like++;
    this.dislike--;
  }

  dislikePoll() {
    this.dislike++;
    this.like--;
  }
}
