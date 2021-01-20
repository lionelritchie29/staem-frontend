import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/models/game';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartItems: Game[] = []; 
  totalPrice: number = 0;

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.get();
    this.totalPrice = this.cartService.getSubTotal();
  }

}
