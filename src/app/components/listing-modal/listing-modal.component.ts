import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { getGameItemImageUrl } from 'src/app/globals';
import { GameItem } from 'src/app/models/game-item';
import { AuthService } from 'src/app/services/auth.service';
import { ListingModalService } from 'src/app/services/listing-modal.service';

const CREATE_SELL_LISTING = gql`
  mutation createSellListing(
    $userId: Int
    $gameItemId: Int
    $price: Int
    $quantity: Int
  ) {
    createSellListing(
      userId: $userId
      gameItemId: $gameItemId
      price: $price
      quantity: $quantity
    )
  }
`;

@Component({
  selector: 'app-listing-modal',
  templateUrl: './listing-modal.component.html',
  styleUrls: ['./listing-modal.component.scss'],
})
export class ListingModalComponent implements OnInit {
  constructor(
    private listingModalService: ListingModalService,
    private fb: FormBuilder,
    private apollo: Apollo,
    private authService: AuthService
  ) {}

  gameItem: GameItem;
  gameTitle: string;
  imageUrl: string;

  userReceiveModel: string;
  buyerPayModel: string;

  modalForm = this.fb.group({
    userReceive: ['', Validators.required],
    buyerPay: ['', Validators.required],
    quantity: [1, Validators.required],
    agree: [null, Validators.required],
  });

  ngOnInit(): void {
    this.gameItem = this.listingModalService.gameItem;
    this.gameTitle = this.listingModalService.gameName;
    this.imageUrl = getGameItemImageUrl(this.gameItem.id, this.gameItem.image);
  }

  onClose() {
    this.listingModalService.setIsOpen(false);
  }

  onSubmit() {
    if (this.modalForm.status === 'INVALID') {
      alert('All filed must be filled');
    } else {
      const userId = this.authService.getLoggedInUserId();
      console.log(this.gameItem.id);

      this.apollo
        .mutate({
          mutation: CREATE_SELL_LISTING,
          variables: {
            userId,
            gameItemId: this.gameItem.id,
            price: this.userReceiveModel,
            quantity: 1,
          },
        })
        .pipe(map((res) => (<any>res.data).createSellListing))
        .subscribe((isSuccess) => {
          if (isSuccess) {
            alert('Success create listing');
            this.onClose();
          } else {
            alert('Failed when create listing');
            this.onClose();
          }
        });
    }
  }

  calculateBuyerPay() {
    const calculateResult: number = parseInt(this.userReceiveModel) * 1.1;
    this.buyerPayModel = Math.ceil(calculateResult).toString();
  }
}
