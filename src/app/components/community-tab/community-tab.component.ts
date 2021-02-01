import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from 'src/app/models/game';
import { GameReview } from 'src/app/models/game-review';
import { ImageVideoPost } from 'src/app/models/image-video-post';
import { AllGameReviewsGqlService } from 'src/app/services/gql/query/all-game-reviews-gql.service';
import { AllImageVideoPostsGqlService } from 'src/app/services/gql/query/all-image-video-posts-gql.service';
import { GetGameTopThreeDiscussionGqlService } from 'src/app/services/gql/query/get-game-top-three-discussion-gql.service';
import { ImageVideoModalService } from 'src/app/services/image-video-modal.service';
import { CommunityTabsComponent } from '../community-tabs/community-tabs.component';

@Component({
  selector: 'app-community-tab',
  templateUrl: './community-tab.component.html',
  styleUrls: ['./community-tab.component.scss'],
})
export class CommunityTabComponent implements OnInit {
  constructor(
    private tabs: CommunityTabsComponent,
    private allImageVideoPostsGqlService: AllImageVideoPostsGqlService,
    private imageVideoModalService: ImageVideoModalService,
    private allGameReviewsGqlService: AllGameReviewsGqlService,
    private getGameTopThreeDiscussionGqlService: GetGameTopThreeDiscussionGqlService,
    private router: Router
  ) {}

  active: boolean = false;
  @Input() tabTitle: string;
  body: string = Math.random().toString();

  imageVideoPosts: ImageVideoPost[] = [];
  reviews: GameReview[] = [];

  games: Game[] = [];

  ngOnInit(): void {
    this.tabs.addTab(this);

    if (this.tabTitle == 'Image and Videos') {
      this.fetchImagesAndVideos();
    } else if (this.tabTitle == 'Reviews') {
      this.fetchReviews();
    } else if (this.tabTitle == 'Discussions') {
      this.fetchDiscussions();
    }
  }

  fetchImagesAndVideos(): void {
    this.allImageVideoPostsGqlService
      .get()
      .subscribe((posts) => (this.imageVideoPosts = posts));
  }

  fetchReviews(): void {
    this.allGameReviewsGqlService.get().subscribe((reviews) => {
      this.reviews = reviews;
      console.log(reviews);
    });
  }

  fetchDiscussions(): void {
    this.getGameTopThreeDiscussionGqlService.get().subscribe((games) => {
      this.games = games;
    });
  }

  onShowImageVideoDetail(index: number) {
    this.imageVideoModalService.postId = this.imageVideoPosts[index].id;
    this.imageVideoModalService.setIsOpen(true);
  }

  redirectDetail(review: GameReview) {
    this.router.navigate([`review/${review.id}`]);
  }
}
