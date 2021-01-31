import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { GameItem } from 'src/app/models/game-item';
import { UserAccount } from 'src/app/models/user-account';
import { AuthService } from 'src/app/services/auth.service';
import { InventoryService } from 'src/app/services/inventory.service';
import { GetUserInventoryGqlService } from 'src/app/services/query/gql/get-user-inventory-gql.service';
import { SellListingModalService } from 'src/app/services/sell-listing-modal.service';

@Component({
  selector: 'app-sell-listing-modal',
  templateUrl: './sell-listing-modal.component.html',
  styleUrls: ['./sell-listing-modal.component.scss'],
})
export class SellListingModalComponent implements OnInit {
  loggedUser: UserAccount;
  inventory: GameItem[] = [];
  groupedInventory: any;
  tabHeaders: any[] = [];
  groupKeys: string[] = [];

  constructor(
    private authService: AuthService,
    private getUserInventoryGqlService: GetUserInventoryGqlService,
    private inventoryService: InventoryService,
    private sellListingModalService: SellListingModalService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getLoggedInUserId();
    this.getUserInventoryGqlService
      .watch({ id: userId })
      .valueChanges.pipe(map((res) => res.data.user))
      .subscribe((user) => {
        this.loggedUser = user;
        this.inventory = user.inventory;
        this.groupedInventory = this.inventoryService.groupInventory(
          this.inventory
        );
        this.tabHeaders = this.inventoryService.getGameHeaders(
          this.groupedInventory
        );
      });
  }

  onClose() {
    this.sellListingModalService.setIsOpen(false);
  }
}
