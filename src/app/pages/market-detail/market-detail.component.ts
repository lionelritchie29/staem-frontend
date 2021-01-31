import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { getGameItemImageUrl, getUserImageUrl } from 'src/app/globals';
import { GameItem } from 'src/app/models/game-item';
import { MarketTransaction } from 'src/app/models/market-transaction';
import { RecentMarketActivity } from 'src/app/models/recent-market-activity';
import { AuthService } from 'src/app/services/auth.service';
import { BuyListingModalService } from 'src/app/services/buy-listing-modal.service';
import { GetMarketDetailInfoGqlService } from 'src/app/services/gql/query/get-market-detail-info-gql.service';
import { SellListingModalService } from 'src/app/services/sell-listing-modal.service';

const GET_GAME = gql`
  query game($id: Int) {
    game(id: $id) {
      id
      title
    }
  }
`;

const INITIAL_RECENT_ACTIVITY = gql`
  query getMarketRecentActivities($gameItemId: Int) {
    marketRecentActivities(gameItemId: $gameItemId) {
      gameItemId
      price
      quantity
      transactionDate
      type
      seller {
        id
        accountName
        profile {
          profilePictureUrl
        }
      }
      buyer {
        id
        accountName
        profile {
          profilePictureUrl
        }
      }
    }
  }
`;

const UPDATE_RECENT_ACTIVITY = gql`
  subscription getMarketRecentActivities($gameItemId: Int) {
    marketRecentActivity(gameItemId: $gameItemId) {
      gameItemId
      price
      quantity
      transactionDate
      type
      seller {
        id
        accountName
        profile {
          profilePictureUrl
        }
      }
      buyer {
        id
        accountName
        profile {
          profilePictureUrl
        }
      }
    }
  }
`;

@Component({
  selector: 'app-market-detail',
  templateUrl: './market-detail.component.html',
  styleUrls: ['./market-detail.component.scss'],
})
export class MarketDetailComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private apollo: Apollo,
    private authService: AuthService,
    private buyListingModalService: BuyListingModalService,
    private sellListingModalService: SellListingModalService,
    private getMarketDetailInfoGqlService: GetMarketDetailInfoGqlService
  ) {}

  gameItem: GameItem;
  gameItemImgUrl: string;
  gameTitle: string = '';

  sellListings: MarketTransaction[] = [];
  buyListings: MarketTransaction[] = [];

  userSellListings: MarketTransaction[] = [];
  userBuyListings: MarketTransaction[] = [];

  recentActivities: RecentMarketActivity[] = [];
  sellerImgUrl: string[] = [];
  // buyerImgUrl: string[] = [];

  refetch: NodeJS.Timeout;

  ngOnInit(): void {
    const gameItemId = this.route.snapshot.params.gameItemId;
    let userId = this.authService.getLoggedInUserId();

    if (userId === null) userId = -1;

    this.fetchListings(gameItemId, userId, true);
    this.refetch = setInterval(() => {
      this.fetchListings(gameItemId, userId, false);
    }, 5000);

    this.initialRecentActivities(gameItemId);
    this.updateRecentActivities(gameItemId);
  }

  fetchListings(gameItemId: number, userId: number, isInitialFetch: boolean) {
    this.getMarketDetailInfoGqlService
      .watch(
        {
          gameItemId,
          userId,
        },
        { fetchPolicy: 'network-only' }
      )
      .valueChanges.pipe(map((res) => <any>res.data))
      .subscribe((res) => {
        this.userBuyListings = res.buyListingByUserAndGameItemId;
        this.userSellListings = res.sellListingByUserAndGameItemId;
        this.sellListings = res.sellListingGroupedByPrice;
        this.buyListings = res.buyListingGroupedByPrice;
        console.log(this.sellListings, this.buyListings);

        if (isInitialFetch) {
          this.gameItem = res.gameItem;
          this.gameItemImgUrl = getGameItemImageUrl(
            this.gameItem.game,
            this.gameItem.image
          );

          this.getGameTitle();
        }
      });
  }

  initialRecentActivities(gameItemId: number) {
    this.apollo
      .query({
        query: INITIAL_RECENT_ACTIVITY,
        variables: { gameItemId },
      })
      .subscribe((res) => {
        this.recentActivities = (<any>res.data).marketRecentActivities;
        this.recentActivities.forEach((act) => {
          this.sellerImgUrl.push(
            getUserImageUrl(act.seller.profile.profilePictureUrl)
          );
        });
      });
  }

  updateRecentActivities(gameItemId: number) {
    this.apollo
      .subscribe({
        query: UPDATE_RECENT_ACTIVITY,
        variables: { gameItemId },
      })
      .subscribe(
        (res) => (this.recentActivities = (<any>res.data).marketRecentActivity)
      );
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
    this.buyListingModalService.gameItem = this.gameItem;
    this.buyListingModalService.gameName = this.gameTitle;
    this.buyListingModalService.lowestPrice = this.sellListings[0].price;
    this.buyListingModalService.highestPrice = this.sellListings[
      this.sellListings.length - 1
    ].price;

    this.buyListingModalService.setIsOpen(true);
  }

  onSell() {
    this.sellListingModalService.setIsOpen(true);
  }

  ngOnDestroy(): void {
    clearInterval(this.refetch);
  }
}
