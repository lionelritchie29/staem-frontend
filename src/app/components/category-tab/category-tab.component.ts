import { AfterContentInit, Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { GLOBALS } from 'src/app/globals';
import { Game } from 'src/app/models/game';
import { GameImage } from 'src/app/models/game-image';
import { AllRecentlyPublishedGameGqlService } from 'src/app/services/gql/query/all-recently-published-game-gql.service';
import { AllSpecialCategoryGameGqlService } from 'src/app/services/gql/query/all-special-category-game-gql.service';
import { AllSpecialOffersGqlService } from 'src/app/services/gql/query/all-special-offers-gql.service';
import { AllTopSellerGamesGqlService } from 'src/app/services/gql/query/all-top-seller-games-gql.service';
import { CategoryTabsComponent } from '../category-tabs/category-tabs.component';

@Component({
  selector: 'app-category-tab',
  templateUrl: './category-tab.component.html',
  styleUrls: ['./category-tab.component.scss'],
})
export class CategoryTabComponent implements OnInit, AfterContentInit {
  @Input() tabTitle: string;

  active: boolean = false;
  games: Game[] = [];
  currentActiveGame: Game = null;
  imageBaseUrl: string;
  filteredGameImages: GameImage[];

  constructor(
    private tabs: CategoryTabsComponent,
    private allRecentlyPublishedGameGqlService: AllRecentlyPublishedGameGqlService,
    private allTopSellerGamesGqlService: AllTopSellerGamesGqlService,
    private allSpecialCategoryGameGqlService: AllSpecialCategoryGameGqlService
  ) {}

  ngOnInit(): void {
    this.tabs.addTab(this);
    this.imageBaseUrl = `${GLOBALS.IMAGE_ENDPOINT}/games`;
  }

  ngAfterContentInit(): void {
    if (this.tabTitle === 'New and Trending') {
      this.getAllRecentlyPublishedGames();
    } else if (this.tabTitle === 'Top Sellers') {
      this.getTopSellerGames();
    } else if (this.tabTitle === 'Specials') {
      this.getSpecialGames();
    }
  }

  getAllRecentlyPublishedGames(): void {
    this.allRecentlyPublishedGameGqlService
      .watch()
      .valueChanges.pipe(map((res) => res.data.recentlyPublishedGames))
      .subscribe((res) => {
        this.games = res;
        if (this.currentActiveGame === null) {
          this.currentActiveGame = res[0];
        }
        this.filterOnlyFourImages();
      });
  }

  getTopSellerGames(): void {
    this.allTopSellerGamesGqlService
      .watch()
      .valueChanges.pipe(map((res) => res.data.topSellerGames))
      .subscribe((res) => {
        this.games = res;
        if (this.currentActiveGame === null) {
          this.currentActiveGame = res[0];
        }
        this.filterOnlyFourImages();
      });
  }

  getSpecialGames(): void {
    this.allSpecialCategoryGameGqlService
      .watch()
      .valueChanges.pipe(map((res) => res.data.specialGames))
      .subscribe((res) => {
        this.games = res;
        if (this.currentActiveGame === null) {
          this.currentActiveGame = res[0];
        }
        this.filterOnlyFourImages();
      });
  }

  onOpenSummary(gameOnHover: Game): void {
    this.currentActiveGame = gameOnHover;
  }

  filterOnlyFourImages() {
    this.filteredGameImages = this.currentActiveGame.images.filter(
      (_, idx) => idx < 4
    );
  }
}
