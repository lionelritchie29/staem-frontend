import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from 'src/app/models/game';
import { GameReview } from 'src/app/models/game-review';
import { ImageVideoPost } from 'src/app/models/image-video-post';
import { AuthService } from 'src/app/services/auth.service';
import { CreateDiscussionModalService } from 'src/app/services/create-discussion-modal.service';
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
    private router: Router,
    private createDiscussionModalService: CreateDiscussionModalService,
    private authService: AuthService
  ) {}

  active: boolean = false;
  @Input() tabTitle: string;
  body: string = Math.random().toString();
  searchTerm: string = '';

  imageVideoPosts: ImageVideoPost[] = [];
  reviews: GameReview[] = [];

  games: Game[] = [];
  showGames: Game[] = [];

  loggedUserId: number;

  ngOnInit(): void {
    this.loggedUserId = this.authService.getLoggedInUserId();
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
      this.showGames = this.games;
    });
  }

  onShowImageVideoDetail(index: number) {
    this.imageVideoModalService.postId = this.imageVideoPosts[index].id;
    this.imageVideoModalService.setIsOpen(true);
  }

  redirectDetail(review: GameReview) {
    this.router.navigate([`review/${review.id}`]);
  }

  filterGame() {
    this.showGames = this.games.filter((game) =>
      game.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    console.log(this.searchTerm);
  }

  onAddDiscussion() {
    this.createDiscussionModalService.setIsOpen(true);
  }
}
