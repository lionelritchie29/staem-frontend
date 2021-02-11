import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { modalTransitionAnimation } from './modal-transition-animation';
import { routeTransitionAnimations } from './route-transition-animation';
import { BuyListingModalService } from './services/buy-listing-modal.service';
import { CreateDiscussionModalService } from './services/create-discussion-modal.service';
import { ImageVideoModalService } from './services/image-video-modal.service';
import { ListingModalService } from './services/listing-modal.service';
import { RemoveCartModalService } from './services/remove-cart-modal.service';
import { SellListingModalService } from './services/sell-listing-modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeTransitionAnimations, modalTransitionAnimation],
})
export class AppComponent {
  isModalOpen: boolean = false;
  isListingOpen: boolean = false;
  isBuyListingOpen: boolean = false;
  isSellListingOpen: boolean = false;
  isImageVideoModalOpen: boolean = false;
  isCreateDiscussModalOpen: boolean = false;

  constructor(
    public removeCartModalService: RemoveCartModalService,
    private listingModalService: ListingModalService,
    private buyListingModalService: BuyListingModalService,
    private sellListingModalService: SellListingModalService,
    private imageVideoModalService: ImageVideoModalService,
    private createDiscussionModalService: CreateDiscussionModalService
  ) {
    removeCartModalService.isOpen$.subscribe((res) => (this.isModalOpen = res));
    listingModalService.isOpen$.subscribe((res) => (this.isListingOpen = res));
    buyListingModalService.isOpen$.subscribe(
      (res) => (this.isBuyListingOpen = res)
    );
    sellListingModalService.isOpen$.subscribe(
      (res) => (this.isSellListingOpen = res)
    );
    imageVideoModalService.isOpen$.subscribe(
      (res) => (this.isImageVideoModalOpen = res)
    );
    createDiscussionModalService.isOpen$.subscribe(
      (res) => (this.isCreateDiscussModalOpen = res)
    );
  }

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animationState']
    );
  }
}
