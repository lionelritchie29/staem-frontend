import { Component, OnInit } from '@angular/core';
import { BuyListingModalService } from 'src/app/services/buy-listing-modal.service';

@Component({
  selector: 'app-buy-listing-modal',
  templateUrl: './buy-listing-modal.component.html',
  styleUrls: ['./buy-listing-modal.component.scss'],
})
export class BuyListingModalComponent implements OnInit {
  constructor(private buyListingModalService: BuyListingModalService) {}

  ngOnInit(): void {}

  onClose() {
    this.buyListingModalService.setIsOpen(false);
  }
}
