import { Component, OnInit, Output } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { RemoveCartModalService } from 'src/app/services/remove-cart-modal.service';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  constructor(
    private removeCartModalService: RemoveCartModalService,
    private cartService: CartService,
  ) { }

  ngOnInit(): void {
  }

  onAccepted(): void {
    this.cartService.remove(this.removeCartModalService.getGameId());
    this.closeModal();
    window.location.reload();
  }

  closeModal(): void {
    this.removeCartModalService.setIsOpen(false);
  }
}
