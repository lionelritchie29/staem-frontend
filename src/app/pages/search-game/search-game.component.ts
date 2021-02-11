import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Game } from 'src/app/models/game';
import { Genre } from 'src/app/models/genre';
import { GamesBySearchQueryGqlService } from 'src/app/services/gql/query/games-by-search-query-gql.service';
import { GetTagsAndGenresGqlService } from 'src/app/services/gql/query/get-tags-and-genres-gql.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search-game',
  templateUrl: './search-game.component.html',
  styleUrls: ['./search-game.component.scss'],
})
export class SearchGameComponent implements OnInit {
  categories: string[] = ['Top Seller', 'New Releases', 'Specials'];
  tags: Genre[] = [];
  queryTerm: string = '';
  searchTerm: string = '';
  bygenreTerm: string = '';
  searchedGameResults: Game[] = [];
  gamePrice: number[] = [];

  //price slider
  sliderMinValue: number = 0;
  sliderCurrentValue: number = 0;
  sliderMaxValue: number = 100;

  //infinite scroll
  page: number = 1;
  limit: number = 10;
  offset: number = 0;
  totalPage: number = 1;
  endMessage: string = '';

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event) {
    const { scrollY, innerHeight } = window;
    const { scrollHeight } = document.body;
    const position = scrollY + innerHeight;

    if (position >= scrollHeight - 400) {
      this.page += 1;
      this.offset = (this.page - 1) * this.limit;
      this.searchGames(this.limit, this.offset).subscribe((games) => {
        const results = games;

        if (results.length > 0) {
          this.searchedGameResults = [...this.searchedGameResults, ...results];
          this.setPriceSlider();

          if (this.bygenreTerm !== '') {
            this.filterByGenre(parseInt(this.bygenreTerm));
          }
        } else {
          this.endMessage = 'All games fetched.';
        }
      });
    }
  }

  constructor(
    private gamesBySearchQueryGqlService: GamesBySearchQueryGqlService,
    private route: ActivatedRoute,
    private router: Router,
    private getTagsAndGenresGqlService: GetTagsAndGenresGqlService
  ) {
    route.queryParams.subscribe((res) => {
      this.queryTerm = res.term;
      this.bygenreTerm = res.bygenre === undefined ? '' : res.bygenre;
      this.searchGames(this.limit, 0).subscribe((gameResults) => {
        this.searchedGameResults = gameResults;
        this.setPriceSlider();

        if (this.bygenreTerm !== '') {
          this.filterByGenre(parseInt(this.bygenreTerm));
        }
      });
    });
  }

  ngOnInit(): void {
    this.getTagsAndGenresGqlService.watch().valueChanges.subscribe((res) => {
      this.tags = res.data.genres;
    });
  }

  searchGames(limit: number, offset: number): Observable<any> {
    return this.gamesBySearchQueryGqlService
      .watch({ query: this.queryTerm, limit, offset })
      .valueChanges.pipe(map((res) => res.data.gamesByTitlelimitOffset));
  }

  setPriceSlider() {
    this.searchedGameResults.forEach((game) => {
      this.gamePrice.push(game.price);
    });

    this.sliderMaxValue = Math.max(...this.gamePrice);
    this.sliderCurrentValue = this.sliderMaxValue;
  }

  onSearchBtnClicked(): void {
    this.router.navigate(['search'], {
      queryParams: { term: this.searchTerm },
    });
    this.searchTerm = '';
  }

  onTagCheckboxChange(genreId: number, e: Event): void {
    if ((<any>e.target).checked) {
      this.filterByGenre(genreId);
    } else {
      this.searchGames(this.limit, this.offset);
    }
  }

  filterByPrice(e: Event) {
    this.sliderCurrentValue = (<any>e.target).value;
    this.gamesBySearchQueryGqlService
      .watch({ query: this.queryTerm })
      .valueChanges.pipe(map((res) => res.data.gamesByTitle))
      .subscribe((gameResults) => {
        this.searchedGameResults = gameResults;
        this.searchedGameResults = this.searchedGameResults.filter(
          (game) => game.price <= this.sliderCurrentValue
        );
      });
  }

  filterByGenre(genreId: number) {
    const newSearchedGameResults: Game[] = [];
    for (let i = 0; i < this.searchedGameResults.length; i++) {
      for (let j = 0; j < this.searchedGameResults[i].tags.length; j++) {
        if (this.searchedGameResults[i].tags[j].id == genreId) {
          newSearchedGameResults.push(this.searchedGameResults[i]);
        }
      }
    }
    this.searchedGameResults = newSearchedGameResults;
  }
}
