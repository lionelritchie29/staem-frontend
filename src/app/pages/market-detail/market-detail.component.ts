import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { getGameItemImageUrl } from 'src/app/globals';
import { GameItem } from 'src/app/models/game-item';
import { MarketTransaction } from 'src/app/models/market-transaction';
import { AuthService } from 'src/app/services/auth.service';
import { BuyListingModalService } from 'src/app/services/buy-listing-modal.service';

const GET_MARKET_DETAIL_INFO = gql`
  query getMarketDetailInfo($gameItemId: Int, $userId: Int) {
    gameItem(id: $gameItemId) {
      id
      name
      description
      image
      game
    }

    sellListingGroupedByPrice(gameItemId: $gameItemId) {
      price
      quantity
    }

    buyListingGroupedByPrice(gameItemId: $gameItemId) {
      price
      quantity
    }

    buyListingByUserAndGameItemId(userId: $userId, gameItemId: $gameItemId) {
      id
      gameItemId
      price
      quantity
      createdAt
    }

    sellListingByUserAndGameItemId(userId: $userId, gameItemId: $gameItemId) {
      id
      gameItemId
      price
      quantity
      createdAt
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
  selector: 'app-market-detail',
  templateUrl: './market-detail.component.html',
  styleUrls: ['./market-detail.component.scss'],
})
export class MarketDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private apollo: Apollo,
    private authService: AuthService,
    private buyListingModalService: BuyListingModalService
  ) {}

  gameItem: GameItem;
  gameItemImgUrl: string;
  gameTitle: string = '';

  sellListings: MarketTransaction[] = [];
  buyListings: MarketTransaction[] = [];

  userSellListings: MarketTransaction[] = [];
  userBuyListings: MarketTransaction[] = [];

  ngOnInit(): void {
    const gameItemId = this.route.snapshot.params.gameItemId;
    let userId = this.authService.getLoggedInUserId();

    if (userId === null) userId = -1;

    this.apollo
      .query({
        query: GET_MARKET_DETAIL_INFO,
        variables: { gameItemId, userId },
      })
      .pipe(map((res) => <any>res.data))
      .subscribe((res) => {
        this.userBuyListings = res.buyListingByUserAndGameItemId;
        this.userSellListings = res.sellListingByUserAndGameItemId;
        console.log(res);
        console.log(this.userSellListings, this.userBuyListings);
        this.sellListings = res.sellListingGroupedByPrice;
        this.buyListings = res.buyListingGroupedByPrice;
        this.gameItem = res.gameItem;
        this.gameItemImgUrl = getGameItemImageUrl(
          this.gameItem.game,
          this.gameItem.image
        );
        this.getGameTitle();
      });
  }

  getGameTitle() {
    this.apollo
      .query({
        query: GET_GAME,
        variables: { id: this.gameItem.game },
      })
      .subscribe((res) => (this.gameTitle = (<any>res.data).game.title));
  }

  onBuy() {
    this.buyListingModalService.setIsOpen(true);
  }
}
