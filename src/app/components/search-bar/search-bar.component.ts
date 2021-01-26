import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { getGameImageUrl } from 'src/app/globals';
import { Game } from 'src/app/models/game';
import { CartService } from 'src/app/services/cart.service';
import { GetGamesByTitleLimit5GqlService } from 'src/app/services/gql/query/get-games-by-title-limit-5-gql.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  
  searchResult: Game[] = [];
  gameImagesUrl: string[] = [];
  searchTerm: string = '';
  cartLength: number = 0;

  constructor(
    private router: Router,
    private cartService: CartService,
    private getGamesByTitleLimit5GqlService: GetGamesByTitleLimit5GqlService
  ) { }

  ngOnInit(): void {
    this.cartLength = this.cartService.get().length;
  }

  onSearchButtonClicked(): void {
    this.router.navigate(['search'], {queryParams: {term: this.searchTerm}});
    this.searchTerm = '';
  }

  onInputChange(searchTerm: string) {
    if (searchTerm === '') {
      this.searchResult = []; 
      return;
    }

    this.getGamesByTitleLimit5GqlService
      .watch({query: searchTerm})
      .valueChanges
      .pipe(map(res => res.data.gamesByTitleLimit5))
      .subscribe(games => {
        this.searchResult = games;
        this.gameImagesUrl = [];
        this.searchResult.forEach(game => {
          this.gameImagesUrl.push(getGameImageUrl(game.id, 'header.jpg'));
        })
      });
  }

}
