import { Component, OnInit } from '@angular/core';
import { BuyListingModalService } from './services/buy-listing-modal.service';
import { ListingModalService } from './services/listing-modal.service';
import { RemoveCartModalService } from './services/remove-cart-modal.service';
import { SellListingModalService } from './services/sell-listing-modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isModalOpen: boolean = false;
  isListingOpen: boolean = false;
  isBuyListingOpen: boolean = false;
  isSellListingOpen: boolean = false;

  constructor(
    public removeCartModalService: RemoveCartModalService,
    private listingModalService: ListingModalService,
    private buyListingModalService: BuyListingModalService,
    private sellListingModalService: SellListingModalService
  ) {
    removeCartModalService.isOpen$.subscribe((res) => (this.isModalOpen = res));
    listingModalService.isOpen$.subscribe((res) => (this.isListingOpen = res));
    buyListingModalService.isOpen$.subscribe(
      (res) => (this.isBuyListingOpen = res)
    );
    sellListingModalService.isOpen$.subscribe(
      (res) => (this.isSellListingOpen = res)
    );
  }
}
