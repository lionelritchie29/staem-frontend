import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { convertDateTimeToDate } from 'src/app/globals';
import { Game } from 'src/app/models/game';

const GET_GAME_BY_ID = gql`
  query getGameById($id:Int){
    game(id:$id){
      id,
      title,
      sale{
        discount,
        validTo
      }
    }
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
  selector: 'app-manage-promo-update',
  templateUrl: './manage-promo-update.component.html',
  styleUrls: ['./manage-promo-update.component.scss']
})
export class ManagePromoUpdateComponent implements OnInit {

  game: Game;
  errorMsg: string = '';

  updatePromoForm: FormGroup = this.fb.group({
    discount: ['22', Validators.required],
    validTo: ['', Validators.required],
  })

  constructor(
    private fb: FormBuilder,
    private apollo: Apollo,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;

    this.apollo.query({
      query: GET_GAME_BY_ID,
      variables: {id}
    }).pipe(map(res => (<any>res.data).game))
    .subscribe(game => {
      this.game = game;
      this.updatePromoForm.setValue({
        discount: game.sale.discount,
        validTo: '',
      })
    })
  }

  onSubmit(): void {
    if (this.updatePromoForm.status === "INVALID ") {
      this.errorMsg = 'All field must be filled';
    } else {
      this.apollo.mutate({
        mutation: UPDATE_PROMO,
        variables: {
          gameId: this.game.id,
          disc: this.updatePromoForm.get('discount').value,
          validTo: this.updatePromoForm.get('validTo').value
        }
      }).subscribe(() => {
        alert("Update Success");
        window.location.reload();
      })
    }
  }

}
