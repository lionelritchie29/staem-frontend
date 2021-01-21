import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Game } from 'src/app/models/game';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-confirm-checkout',
  templateUrl: './confirm-checkout.component.html',
  styleUrls: ['./confirm-checkout.component.scss']
})
export class ConfirmCheckoutComponent implements OnInit {

  @Output() transactionAccepted: EventEmitter<any> = new EventEmitter();
  cartItems: Game[] = [];
  subTotal: number = 0;
  agreeFlag: HTMLInputElement;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.get();
    this.subTotal = this.cartService.getSubTotal();
  }

  onPurchase() {
    if(this.agreeFlag === undefined) alert('You must agree to the terms.')
    else this.transactionAccepted.emit()
  }

}
