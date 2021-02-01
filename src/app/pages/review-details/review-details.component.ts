import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { getUserImageUrl } from 'src/app/globals';
import { GameReview } from 'src/app/models/game-review';
import { UserAccount } from 'src/app/models/user-account';
import { AuthService } from 'src/app/services/auth.service';
import { GetUserByIdGqlService } from 'src/app/services/gql/get-user-by-id-gql.service';

const GET_REVIEW_DETAIL = gql`
  query getGameReviewById($gameId: Int) {
    gameReviewById(gameId: $gameId) {
      id
      downvoteCount
      gameId
      isRecommended
      reviewDateTime
      title
      upvoteCount
      content
      user {
        id
        accountName
        profile {
          profilePictureUrl
        }
      }
      comments {
        comments
        user {
          id
          accountName
          profile {
            profilePictureUrl
          }
        }
        createdAt
      }
    }
  }
`;

@Component({
  selector: 'app-review-details',
  templateUrl: './review-details.component.html',
  styleUrls: ['./review-details.component.scss'],
})
export class ReviewDetailsComponent implements OnInit {
  constructor(
    private apollo: Apollo,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService,
    private getUserByIdGqlService: GetUserByIdGqlService
  ) {}

  review: GameReview[] = [];
  loggedUserImgUrl: string;
  loggedUser: UserAccount = null;

  commentForm = this.fb.group({
    content: ['', Validators.required],
  });

  ngOnInit(): void {
    const reviewId = this.route.snapshot.params.id;

    this.apollo
      .query({
        query: GET_REVIEW_DETAIL,
        variables: { gameId: reviewId }, //should be reviewId not gameID
      })
      .pipe(map((res) => (<any>res.data).gameReviewById))
      .subscribe((review) => {
        this.review.push(review);
        console.log(review.comments);
        console.log(this.review);
      });

    const userId = this.authService.getLoggedInUserId();
    if (userId != null) {
      this.getUserByIdGqlService
        .watch({ id: userId })
        .valueChanges.subscribe((res) => {
          this.loggedUser = res.data.user;
          this.loggedUserImgUrl = getUserImageUrl(
            this.loggedUser.profile.profilePictureUrl
          );
        });
    }
  }
}
