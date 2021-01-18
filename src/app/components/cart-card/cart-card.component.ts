import { Component, Input, OnInit } from '@angular/core';
import { getGameImageUrl } from 'src/app/globals';
import { Game } from 'src/app/models/game';
import { CartService } from 'src/app/services/cart.service';
import { RemoveCartModalService } from 'src/app/services/remove-cart-modal.service';

@Component({
  selector: 'app-cart-card',
  templateUrl: './cart-card.component.html',
  styleUrls: ['./cart-card.component.scss']
})
export class CartCardComponent implements OnInit {

  @Input() cart: Game;
  imageUrl: string = '';

  constructor(
    private cartService: CartService,
    private removeCartModalService: RemoveCartModalService
  ) { 
  }

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
    this.removeCartModalService.setIsOpen(true);
    this.removeCartModalService.setGameId(gameId);
  }

}
