import { Component, Input, OnInit } from '@angular/core';
import { getUserImageUrl } from 'src/app/globals';

@Component({
  selector: 'app-review-comment-card',
  templateUrl: './review-comment-card.component.html',
  styleUrls: ['./review-comment-card.component.scss'],
})
export class ReviewCommentCardComponent implements OnInit {
  constructor() {}

  @Input() comment: any;
  imgUrl: string = '';

  ngOnInit(): void {
    this.imgUrl = getUserImageUrl(this.comment.user.profile.profilePictureUrl);
  }
}
