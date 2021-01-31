import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { GameItem } from 'src/app/models/game-item';
import { UserAccount } from 'src/app/models/user-account';
import { AuthService } from 'src/app/services/auth.service';
import { BuyListingModalService } from 'src/app/services/buy-listing-modal.service';
import { GetUserByIdGqlService } from 'src/app/services/gql/get-user-by-id-gql.service';

const CREATE_BUY_LISTING = gql`
  mutation createBuyListing(
    $userId: Int
    $gameItemId: Int
    $price: Int
    $quantity: Int
  ) {
    createBuyListing(
      userId: $userId
      gameItemId: $gameItemId
      price: $price
      quantity: $quantity
    )
  }
`;

@Component({
  selector: 'app-buy-listing-modal',
  templateUrl: './buy-listing-modal.component.html',
  styleUrls: ['./buy-listing-modal.component.scss'],
})
export class BuyListingModalComponent implements OnInit {
  constructor(
    private buyListingModalService: BuyListingModalService,
    private getUserById: GetUserByIdGqlService,
    private authService: AuthService,
    private apollo: Apollo
  ) {}

  gameItem: GameItem;
  gameName: string;
  currentUser: UserAccount;
  lowestPrice: number = 0;
  highestPrice: number;

  price: number = 0;
  quantity: number = 1;

  ngOnInit(): void {
    this.gameItem = this.buyListingModalService.gameItem;
    this.gameName = this.buyListingModalService.gameName;
    this.lowestPrice = this.buyListingModalService.lowestPrice * 1.1;
    this.highestPrice = this.buyListingModalService.highestPrice;

    this.price = this.lowestPrice;
    const userId = this.authService.getLoggedInUserId();
    this.getUserById.get(userId).subscribe((user) => (this.currentUser = user));
  }

  onClose() {
    this.buyListingModalService.setIsOpen(false);
  }

  onPlaceOrder() {
    if (this.price <= 0 || this.quantity <= 0) {
      alert('All field must be filled');
    } else if (this.price > this.highestPrice) {
      alert('Price exceed highest price');
    } else {
      this.apollo
        .mutate({
          mutation: CREATE_BUY_LISTING,
          variables: {
            userId: this.currentUser.id,
            gameItemId: this.gameItem.id,
            price: this.price,
            quantity: this.quantity,
          },
        })
        .pipe(map((res) => (<any>res.data).createBuyListing))
        .subscribe((isSuccess) => {
          if (isSuccess) {
            alert('Order placed!');
            this.buyListingModalService.setIsOpen(false);
          } else {
            alert('Something is wrong when placing your order...');
          }
        });
    }
  }
}
