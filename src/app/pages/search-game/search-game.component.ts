import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Game } from 'src/app/models/game';
import { GamesBySearchQueryGqlService } from 'src/app/services/gql/query/games-by-search-query-gql.service';

@Component({
  selector: 'app-search-game',
  templateUrl: './search-game.component.html',
  styleUrls: ['./search-game.component.scss']
})
export class SearchGameComponent implements OnInit {

  categories: string[] = ['Top Seller', 'New Releases', 'Specials'];
  tags: string[] = ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4', 'Tag 5', 'Tag 6', 'Tag 7', 'Tag 8', 'Tag 9', 'Tag 10'];
  queryTerm: string = '';
  searchTerm: string = '';
  searchedGameResults: Game[] = [];

  constructor(
    private gamesBySearchQueryGqlService: GamesBySearchQueryGqlService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    route.queryParams
      .subscribe(res => {
        this.queryTerm = res.term;
        console.log(this.queryTerm);
        this.searchGames();
      });
  }

  ngOnInit(): void {

  }

  searchGames(): void {
    this.gamesBySearchQueryGqlService
      .watch({query: this.queryTerm})
      .valueChanges
      .pipe(map(res => res.data.gamesByTitle))
      .subscribe(gameResults => {
        this.searchedGameResults = gameResults;
        console.log(this.searchedGameResults);
      })
  }

  onSearchBtnClicked():void {
    this.router.navigate(['search'], {queryParams: {term: this.searchTerm}});
    this.searchTerm = '';
  }

}
