import { Component, Input, OnInit } from '@angular/core';
import { getGameImageUrl } from 'src/app/globals';
import { Game } from 'src/app/models/game';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-card',
  templateUrl: './cart-card.component.html',
  styleUrls: ['./cart-card.component.scss']
})
export class CartCardComponent implements OnInit {

  @Input() cart: Game;
  imageUrl: string = '';

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.getHeaderImgUrl();
    this.imageUrl = getGameImageUrl(this.cart.id, this.imageUrl);
  }

  getHeaderImgUrl() {
    this.cart.images.forEach((img) => {
      if (img.url === 'header.jpg') {
        this.imageUrl = img.url;
      }
    })
  }

  onRemoveBtnClicked(gameId: number): void {
    console.log(gameId);
    this.cartService.remove(gameId);
  }

}
