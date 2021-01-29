import { Component, Input, OnInit } from '@angular/core';
import { GameItem } from 'src/app/models/game-item';
import { InventoryTabsComponent } from '../inventory-tabs/inventory-tabs.component';
import { getGameItemImageUrl } from 'src/app/globals';

@Component({
  selector: 'app-inventory-tab',
  templateUrl: './inventory-tab.component.html',
  styleUrls: ['./inventory-tab.component.scss'],
})
export class InventoryTabComponent implements OnInit {
  @Input() tabTitle: string;
  @Input() items: GameItem[] = [];
  itemImageUrls: string[] = [];
  showItems: GameItem[] | any = [];

  active: boolean = false;
  body: string = Math.random().toString();
  numbers = Array(9)
    .fill(0)
    .map((x, i) => i);

  page: number = 1;
  totalPage: number = 1;
  limit: number = 9;
  currentItemIdx: number = 0;

  searchTerm: string = '';

  constructor(private tabs: InventoryTabsComponent) {}

  ngOnInit(): void {
    this.tabs.addTab(this);
    this.items.forEach((item) => {
      this.itemImageUrls.push(getGameItemImageUrl(item.game, item.image));
    });
    this.totalPage = Math.ceil(this.items.length / this.limit);

    this.fetchItems();
  }

  fetchItems() {
    this.showItems = [];
    for (let i = 0; i < this.limit; i++) {
      this.showItems.push(this.items[(this.page - 1) * this.limit + i]);
    }
    console.log(this.showItems);
  }

  onNext() {
    if (this.page == this.totalPage) return;

    this.page += 1;
    this.fetchItems();
  }

  onPrev() {
    if (this.page == 1) return;

    this.page -= 1;
    this.fetchItems();
  }

  showItemDetail(index: number) {
    this.currentItemIdx = index;
  }

  onSearch() {
    if (this.searchTerm == '') {
      console.log(true);
      this.fetchItems();
    } else {
      this.showItems = [];
      this.items.forEach((item) => {
        if (item.name.toLowerCase().includes(this.searchTerm.toLowerCase())) {
          console.log(item.name, this.searchTerm);
          this.showItems.push(item);
        }
      });
      console.log(this.showItems);
    }
  }
}
