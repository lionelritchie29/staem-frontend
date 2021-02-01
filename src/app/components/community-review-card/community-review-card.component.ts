import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { getUserImageUrl } from 'src/app/globals';
import { GameReview } from 'src/app/models/game-review';
import { IncreaseReviewDownvoteGqlService } from 'src/app/services/gql/mutation/increase-review-downvote-gql.service';
import { IncreaseReviewUpvoteGqlService } from 'src/app/services/gql/mutation/increase-review-upvote-gql.service';

@Component({
  selector: 'app-community-review-card',
  templateUrl: './community-review-card.component.html',
  styleUrls: ['./community-review-card.component.scss'],
})
export class CommunityReviewCardComponent implements OnInit {
  @Input() review: GameReview[];
  @Input() trim: boolean;
  imgUrl: string = '';
  trimmedReviewContent: string = '';

  constructor(
    private increaseReviewUpvoteGqlService: IncreaseReviewUpvoteGqlService,
    private increaseReviewDownvoteGqlService: IncreaseReviewDownvoteGqlService
  ) {}

  ngOnInit(): void {
    if (this.trim) {
      this.doTrim();
    } else {
      this.trimmedReviewContent = this.review[0].content;
    }
    this.imgUrl = getUserImageUrl(
      this.review[0].user.profile.profilePictureUrl
    );
  }

  doTrim() {
    this.trimmedReviewContent =
      this.review[0].content.substring(0, 100) + '...';
  }

  onUpvote(): void {
    this.increaseReviewUpvoteGqlService
      .mutate({ id: this.review[0].id })
      .pipe(map((res) => (<any>res.data).increseReviewUpvote))
      .subscribe((isSuccess) => {
        console.log(isSuccess);
        if (isSuccess) {
          alert('Success!');
          window.location.reload();
        } else {
          alert('Oops. Error when upvoting this review');
        }
      });
  }

  onDownvote(): void {
    this.increaseReviewDownvoteGqlService
      .mutate({ id: this.review[0].id })
      .pipe(map((res) => (<any>res.data).increseReviewDownvote))
      .subscribe((isSuccess) => {
        if (isSuccess) {
          alert('Success!!');
          window.location.reload();
        } else {
          alert('Oops. Error when downvoting this review');
        }
      });
  }
}
