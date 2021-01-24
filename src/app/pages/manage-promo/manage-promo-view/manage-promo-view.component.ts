import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { Game } from 'src/app/models/game';
import { GameSale } from 'src/app/models/game-sale';
import { AllSpecialOffersGqlService } from 'src/app/services/gql/query/all-special-offers-gql.service';

const DELETE_PROMO = gql`
  mutation deleteSale($gameId:Int) {
    deletePromo(gameId:$gameId)
  }
`;

const UPDATE_PROMO = gql`
  mutation updateSale($gameId:Int, $disc:Int, $validTo:String){
    updatePromo(gameId:$gameId, discount: $disc,validTo:$validTo){
      gameId,
      validTo,
      discount
    }
  }
`;

@Component({
  selector: 'app-manage-promo-view',
  templateUrl: './manage-promo-view.component.html',
  styleUrls: ['./manage-promo-view.component.scss']
})
export class ManagePromoViewComponent implements OnInit {

  gameList: Game[] = [];
  sales: GameSale[] = [];

  constructor(
    private AllSpecialOffersGqlService: AllSpecialOffersGqlService,
    private apollo: Apollo,
    private router: Router
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

  onDelete(gameId: number) {
    this.apollo.mutate({
      mutation: DELETE_PROMO,
      variables: {gameId},
    }).pipe(map(res => (<any>res.data).deletePromo))
    .subscribe(isSuccess => {
      if (isSuccess) {
        alert("Delete Success");
        window.location.reload();
      } else {
        alert("Delete Failed");
      }
    })
  }

  onUpdate(gameId: number) {
    this.router.navigate([`/admin/manage-promo/update/${gameId}`])
  }

}
