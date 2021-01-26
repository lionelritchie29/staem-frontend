import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Game } from 'src/app/models/game';
import { Genre } from 'src/app/models/genre';
import { GamesBySearchQueryGqlService } from 'src/app/services/gql/query/games-by-search-query-gql.service';
import { GetTagsAndGenresGqlService } from 'src/app/services/gql/query/get-tags-and-genres-gql.service';

@Component({
  selector: 'app-search-game',
  templateUrl: './search-game.component.html',
  styleUrls: ['./search-game.component.scss']
})
export class SearchGameComponent implements OnInit {

  categories: string[] = ['Top Seller', 'New Releases', 'Specials'];
  tags: Genre[] = [];
  queryTerm: string = '';
  searchTerm: string = '';
  bygenreTerm: string = '';
  searchedGameResults: Game[] = [];
  gamePrice: number[] = [];

  sliderMinValue: number = 0;
  sliderCurrentValue: number = 0;
  sliderMaxValue: number = 100;

  constructor(
    private gamesBySearchQueryGqlService: GamesBySearchQueryGqlService,
    private route: ActivatedRoute,
    private router: Router,
    private getTagsAndGenresGqlService: GetTagsAndGenresGqlService
  ) { 
    route.queryParams
      .subscribe(res => {
        this.queryTerm = res.term;
        this.bygenreTerm = res.bygenre === undefined ? '' : res.bygenre;
        this.searchGames();
      });
  }

  ngOnInit(): void {
    this.getTagsAndGenresGqlService.watch()
      .valueChanges
      .subscribe(res => {
        this.tags = res.data.genres;
      })
  }

  searchGames(): void {
    this.gamesBySearchQueryGqlService
      .watch({query: this.queryTerm})
      .valueChanges
      .pipe(map(res => res.data.gamesByTitle))
      .subscribe(gameResults => {
        this.searchedGameResults = gameResults;
        this.setPriceSlider();

        if (this.bygenreTerm !== '') {
          this.filterByGenre(parseInt(this.bygenreTerm));
        }
      })
  }

  setPriceSlider() {
    this.searchedGameResults.forEach(game => {
      this.gamePrice.push(game.price);
    })

    this.sliderMaxValue = Math.max(...this.gamePrice);
    this.sliderCurrentValue = this.sliderMaxValue
  }

  onSearchBtnClicked():void {
    this.router.navigate(['search'], {queryParams: {term: this.searchTerm}});
    this.searchTerm = '';
  }

  onTagCheckboxChange(genreId: number, e: Event): void {
    if((<any>e.target).checked) {
      this.filterByGenre(genreId);
    } else {
      this.searchGames();
    }
  }

  filterByPrice(e: Event) {
    this.sliderCurrentValue = (<any>e.target).value;
    this.gamesBySearchQueryGqlService
      .watch({query: this.queryTerm})
      .valueChanges
      .pipe(map(res => res.data.gamesByTitle))
      .subscribe(gameResults => {
        this.searchedGameResults = gameResults;
        this.searchedGameResults = this.searchedGameResults.filter(game => game.price <= this.sliderCurrentValue);
      })
  }

  filterByGenre(genreId: number) {
    const newSearchedGameResults: Game[] = [];
      for (let i=0; i<this.searchedGameResults.length; i++) {
        for (let j=0; j<this.searchedGameResults[i].tags.length; j++) {
          if(this.searchedGameResults[i].tags[j].id == genreId) {
            newSearchedGameResults.push(this.searchedGameResults[i]);
          }
        }
      }
      this.searchedGameResults = newSearchedGameResults;
  }

}
