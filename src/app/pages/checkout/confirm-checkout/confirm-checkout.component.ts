import { Component, OnInit, Output } from '@angular/core';
import { Game } from 'src/app/models/game';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-confirm-checkout',
  templateUrl: './confirm-checkout.component.html',
  styleUrls: ['./confirm-checkout.component.scss']
})
export class ConfirmCheckoutComponent implements OnInit {

  cartItems: Game[] = [];
  subTotal: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.get();
    this.subTotal = this.cartService.getSubTotal();
  }

  onPurchase() {

  }

}
