import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { Game } from 'src/app/models/game';
import { CreateNewPromoGqlService } from 'src/app/services/gql/mutation/create-new-promo-gql.service';

const GET_GAMES = gql`
  query getGames{
    games{
      id,
      title,
      sale{
        gameId,
        validTo,
        discount
      }
    }
  }
`;

@Component({
  selector: 'app-manage-promo-add',
  templateUrl: './manage-promo-add.component.html',
  styleUrls: ['./manage-promo-add.component.scss']
})
export class ManagePromoAddComponent implements OnInit {

  games: Game[] = [];
  errorMsg: string = '';

  constructor(
    private fb: FormBuilder,
    private apollo: Apollo,
    private createNewPromoGqlService: CreateNewPromoGqlService
  ) { }

  addPromoForm: FormGroup = this.fb.group({
    title: ['1', Validators.required],
    discount: ['', Validators.required],
    validTo: ['', Validators.required],
  })

  ngOnInit(): void {
    this.apollo.watchQuery({
      query: GET_GAMES,
    }).valueChanges
    .pipe(map(res => (<any>res.data).games))
    .subscribe(games => {
      this.games = games;
      this.games = 
        this.games.filter(game => game.sale.discount == 0);
    });
  }

  onSubmit() {
    if (this.addPromoForm.status === "INVALID") {
      this.errorMsg = 'All field must be filled';
    } else if (this.addPromoForm.get('discount').value <= 0 || this.addPromoForm.get('discount').value > 100) {
      this.errorMsg = 'Discount must be between 1 and 100';
    } else if (this.addPromoForm.get('title').value == '1') {
      this.errorMsg = 'You must select a game title';
    } else {
      this.errorMsg = '';
      this.addPromo();
    }
  }

  addPromo() {
    this.createNewPromoGqlService.mutate({
      "gameId": parseInt(this.addPromoForm.get('title').value),
      "disc": parseInt(this.addPromoForm.get('discount').value),
      "validTo": this.addPromoForm.get('validTo').value,
    })
    .subscribe(() => {
      alert('Add Promo Success!');
      this.addPromoForm.reset();
    })
  }

}
