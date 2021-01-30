import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { Game } from 'src/app/models/game';
import { MarketTransaction } from 'src/app/models/market-transaction';
import { AllSellListingsGqlService } from 'src/app/services/gql/query/all-sell-listings-gql.service';

const GET_SELL_LISTINGS_PAGINATED = gql`
  query getSellListingsPaginate($limit: Int, $offset: Int) {
    sellListingsPaginate(limit: $limit, offset: $offset) {
      totalItems
      listings {
        gameItem {
          id
          name
          image
          game
        }
        quantity
        lowestPrice
      }
    }
  }
`;

const GET_GAME = gql`
  query game($id: Int) {
    game(id: $id) {
      id
      title
    }
  }
`;

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss'],
})
export class MarketComponent implements OnInit {
  constructor(private apollo: Apollo) {}

  sellListings: MarketTransaction[] = [];
  games: Game[] = [];
  limit: number = 10;
  offset: number = 0;
  page: number = 1;
  totalPage: number = 1;

  ngOnInit(): void {
    this.fetchListings();
  }

  fetchListings() {
    this.apollo
      .query({
        query: GET_SELL_LISTINGS_PAGINATED,
        variables: { limit: this.limit, offset: this.offset },
      })
      .pipe(map((res) => (res.data as any).sellListingsPaginate))
      .subscribe((res) => {
        this.totalPage = Math.ceil(res.totalItems / this.limit);
        this.sellListings = res.listings;
        this.fetchGames();
      });
  }

  fetchGames() {
    this.sellListings.forEach((list) => {
      this.apollo
        .query({
          query: GET_GAME,
          variables: { id: (list as any).gameItem.game },
        })
        .pipe(map((res) => (<any>res.data).game))
        .subscribe((game) => this.games.push(game));
    });
  }

  onNext(): void {
    if (this.page == this.totalPage) return;
    this.page += 1;
    this.offset = (this.page - 1) * this.limit;

    this.fetchListings();
  }

  onPrev(): void {
    if (this.page == 1) return;
    this.page -= 1;
    this.offset = (this.page - 1) * this.limit;

    this.fetchListings();
  }
}
