import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { GameReview } from 'src/app/models/game-review';
import { HelpfulGameReviewsGqlService } from 'src/app/services/gql/query/helpful-game-reviews-gql.service';
import { RecentlyPostedGameReviewsGqlService } from 'src/app/services/gql/query/recently-posted-game-reviews-gql.service';

@Component({
  selector: 'app-game-reviews',
  templateUrl: './game-reviews.component.html',
  styleUrls: ['./game-reviews.component.scss']
})
export class GameReviewsComponent implements OnInit {

  mostHelpfulReviews: GameReview[] = [];
  recentlyPostedReviews: GameReview[] = [];
  @Input() currentGameId: number;

  constructor(
    private helpfulGameReviewsGqlService: HelpfulGameReviewsGqlService,
    private recentlyPostedGameReviewsGqlService: RecentlyPostedGameReviewsGqlService
  ) { }

  ngOnInit(): void {
    this.getHelpfulReviews();
    this.getRecentlyPostedReviews();
  }

  getHelpfulReviews(): void {
    this.helpfulGameReviewsGqlService
    .watch({id: this.currentGameId})
    .valueChanges
    .pipe(map(res => res.data.mostHelpfulReviewByGameId))
    .subscribe(reviews => {
      this.mostHelpfulReviews = reviews;
    })
  }

  getRecentlyPostedReviews(): void {
    this.recentlyPostedGameReviewsGqlService
    .watch({id: this.currentGameId})
    .valueChanges
    .pipe(map(res => res.data.recentlyPostedReviewByGameId))
    .subscribe(reviews => {
      this.recentlyPostedReviews = reviews;
    })
  }

}
