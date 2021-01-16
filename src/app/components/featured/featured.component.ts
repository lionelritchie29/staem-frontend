import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/models/game';
import { AllFeaturedRecommendedGqlService } from 'src/app/services/gql/query/all-featured-recommended-gql.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent implements OnInit {

  games: Game[] = [];
  rightArrowClickCount: number = 1;
  leftArrowClickCount: number = 1;

  constructor(private allFeaturedRecommendedGqlService: AllFeaturedRecommendedGqlService) { }

  ngOnInit(): void {
    this.allFeaturedRecommendedGqlService.watch()
      .valueChanges
      .pipe(map(res => res.data.featuredGames))
      .subscribe(games => {
        this.games = games;
        // console.log(games);
      })
  }

  OnArrowRightClick(): void {
    if(this.rightArrowClickCount != this.games.length) {
      console.log("red");
      const itemContainer: HTMLElement = document.querySelector(".main-slider-container-images");
      const itemWidth: number = document.querySelector('app-featured-card').clientWidth;
      itemContainer.style.marginLeft = `-${this.rightArrowClickCount * itemWidth}px`;
      this.rightArrowClickCount++;
      this.leftArrowClickCount--;
    }
  }

  OnArrowLeftClick(): void {
    if(this.leftArrowClickCount != 1) {
      console.log("red");
      const itemContainer: HTMLElement = document.querySelector(".main-slider-container-images");
      const itemWidth: number = document.querySelector('app-featured-card').clientWidth;
      itemContainer.style.marginLeft = `${this.leftArrowClickCount * itemWidth}px`;
      this.leftArrowClickCount++;
      this.rightArrowClickCount--;
    }
  }
}
