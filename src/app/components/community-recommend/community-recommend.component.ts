import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Game } from 'src/app/models/game';
import { AllCommunityRecommendedGamesGqlService } from 'src/app/services/gql/query/all-community-recommended-games-gql.service';

@Component({
  selector: 'app-community-recommend',
  templateUrl: './community-recommend.component.html',
  styleUrls: ['./community-recommend.component.scss'],
})
export class CommunityRecommendComponent implements OnInit {
  games: Game[] = [];
  rightArrowClickCount: number = 1;
  leftArrowClickCount: number = 1;

  constructor(
    private allCommunityRecommendedGamesGqlService: AllCommunityRecommendedGamesGqlService
  ) {}

  ngOnInit(): void {
    this.allCommunityRecommendedGamesGqlService
      .watch()
      .valueChanges.pipe(map((res) => res.data.communityRecommendedGames))
      .subscribe((games) => {
        this.games = games;
      });
  }

  OnArrowRightClick(): void {
    if (this.rightArrowClickCount != this.games.length) {
      const itemContainer: HTMLElement = document.querySelector(
        '.community-slider-container-images'
      );
      const itemWidth: number = document.querySelector('app-featured-card')
        .clientWidth;
      itemContainer.style.marginLeft = `-${
        this.rightArrowClickCount * itemWidth
      }px`;
      this.rightArrowClickCount++;
      this.leftArrowClickCount--;
    }
  }

  OnArrowLeftClick(): void {
    if (this.leftArrowClickCount != 1) {
      const itemContainer: HTMLElement = document.querySelector(
        '.community-slider-container-images'
      );
      const itemWidth: number = document.querySelector('app-featured-card')
        .clientWidth;
      itemContainer.style.marginLeft = `${
        this.leftArrowClickCount * itemWidth
      }px`;
      this.leftArrowClickCount++;
      this.rightArrowClickCount--;
    }
  }
}
