import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import {
  convertDateTimeToDate,
  getMonthName,
  getUserImageUrl,
} from 'src/app/globals';
import { GameReview } from 'src/app/models/game-review';
import { IncreaseReviewDownvoteGqlService } from 'src/app/services/gql/mutation/increase-review-downvote-gql.service';
import { IncreaseReviewUpvoteGqlService } from 'src/app/services/gql/mutation/increase-review-upvote-gql.service';
import { ValidateUserLoggedInService } from 'src/app/services/validate-user-logged-in.service';

@Component({
  selector: 'app-helpful-review-card',
  templateUrl: './helpful-review-card.component.html',
  styleUrls: ['./helpful-review-card.component.scss'],
})
export class HelpfulReviewCardComponent implements OnInit {
  @Input() review: GameReview;
  convertedDate: string;
  imageUrl: string = '';

  constructor(
    private increaseReviewUpvoteGqlService: IncreaseReviewUpvoteGqlService,
    private increaseReviewDownvoteGqlService: IncreaseReviewDownvoteGqlService,
    private validateUserLoggedInService: ValidateUserLoggedInService
  ) {}

  ngOnInit(): void {
    const reviewDate = convertDateTimeToDate(this.review.reviewDateTime);
    this.convertedDate = `${reviewDate.getDate()} ${getMonthName(
      reviewDate.getMonth() + 1
    )}, ${reviewDate.getFullYear()}`;
    this.imageUrl = getUserImageUrl(this.review.user.profile.profilePictureUrl);
  }

  onUpvote(): void {
    if (!this.validateUserLoggedInService.validate()) return;

    this.increaseReviewUpvoteGqlService
      .mutate({ id: this.review.id })
      .pipe(map((res) => (<any>res.data).increseReviewUpvote))
      .subscribe((isSuccess) => {
        console.log(isSuccess);
        if (isSuccess) {
          alert('Upvote success!');
          window.location.reload();
        } else {
          alert('Oops. Error when upvoting this review');
        }
      });
  }

  onDownvote(): void {
    if (!this.validateUserLoggedInService.validate()) return;

    this.increaseReviewDownvoteGqlService
      .mutate({ id: this.review.id })
      .pipe(map((res) => (<any>res.data).increseReviewDownvote))
      .subscribe((isSuccess) => {
        if (isSuccess) {
          alert('Downvote success!');
          window.location.reload();
        } else {
          alert('Oops. Error when downvoting this review');
        }
      });
  }
}
