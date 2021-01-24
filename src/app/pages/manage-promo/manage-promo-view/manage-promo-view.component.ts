import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Game } from 'src/app/models/game';
import { GameSale } from 'src/app/models/game-sale';
import { AllSpecialOffersGqlService } from 'src/app/services/gql/query/all-special-offers-gql.service';

@Component({
  selector: 'app-manage-promo-view',
  templateUrl: './manage-promo-view.component.html',
  styleUrls: ['./manage-promo-view.component.scss']
})
export class ManagePromoViewComponent implements OnInit {

  gameList: Game[] = [];
  sales: GameSale[] = [];

  constructor(
    private AllSpecialOffersGqlService: AllSpecialOffersGqlService
  ) { }

  ngOnInit(): void {
    this.AllSpecialOffersGqlService.watch()
      .valueChanges
      .pipe(map(res => res.data))
      .subscribe(res => {
        this.gameList = res.gamesOnSale;
        this.sales = res.gameSales;
      });
  }

}
