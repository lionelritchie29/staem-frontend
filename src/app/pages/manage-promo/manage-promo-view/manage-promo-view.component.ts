import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { Game } from 'src/app/models/game';
import { GameSale } from 'src/app/models/game-sale';
import { AllSpecialOffersGqlService } from 'src/app/services/gql/query/all-special-offers-gql.service';

const DELETE_PROMO = gql`
  mutation deleteSale($gameId: Int) {
    deletePromo(gameId: $gameId)
  }
`;

const SALE_LIMIT_OFFSET = gql`
  query getGameOnSaleLimitOffset($limit: Int, $offset: Int) {
    gamePromoLimitOffset(limit: $limit, offset: $offset) {
      totalCount
      games {
        id
        title
        description
        price
        releasedate
        developer {
          id
          name
        }
        publisher {
          id
          name
        }
        tags {
          id
          name
          isAdult
        }
        genres {
          id
          name
        }
        images {
          url
        }
      }
    }

    gameSales {
      gameId
      discount
      validTo
    }
  }
`;

@Component({
  selector: 'app-manage-promo-view',
  templateUrl: './manage-promo-view.component.html',
  styleUrls: ['./manage-promo-view.component.scss'],
})
export class ManagePromoViewComponent implements OnInit {
  gameList: Game[] = [];
  sales: GameSale[] = [];

  limit: number = 5;
  offset: number = 0;
  page: number = 1;
  totalPage: number = 1;

  constructor(private apollo: Apollo, private router: Router) {}

  ngOnInit(): void {
    this.fetchGames();
  }

  fetchGames() {
    this.apollo
      .watchQuery({
        query: SALE_LIMIT_OFFSET,
        variables: { limit: this.limit, offset: this.offset },
      })
      .valueChanges.pipe(map((res) => <any>res.data))
      .subscribe((res) => {
        console.log(res);
        this.totalPage = Math.ceil(
          res.gamePromoLimitOffset.totalCount / this.limit
        );
        this.gameList = res.gamePromoLimitOffset.games;
        this.sales = res.gameSales;
      });
  }

  onDelete(gameId: number) {
    this.apollo
      .mutate({
        mutation: DELETE_PROMO,
        variables: { gameId },
      })
      .pipe(map((res) => (<any>res.data).deletePromo))
      .subscribe((isSuccess) => {
        if (isSuccess) {
          alert('Delete Success');
          window.location.reload();
        } else {
          alert('Delete Failed');
        }
      });
  }

  onUpdate(gameId: number) {
    this.router.navigate([`/admin/manage-promo/update/${gameId}`]);
  }

  onNext() {
    if (this.page == this.totalPage) return;

    this.page += 1;
    this.offset = (this.page - 1) * this.limit;
    this.fetchGames();
  }

  onPrev() {
    if (this.page == 1) return;

    this.page -= 1;
    this.offset = (this.page - 1) * this.limit;
    this.fetchGames();
  }
}
