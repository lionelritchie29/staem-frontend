import { Component, Input, OnInit } from '@angular/core';
import { InventoryTabComponent } from '../inventory-tab/inventory-tab.component';

@Component({
  selector: 'app-inventory-tabs',
  templateUrl: './inventory-tabs.component.html',
  styleUrls: ['./inventory-tabs.component.scss'],
})
export class InventoryTabsComponent implements OnInit {
  tabs: InventoryTabComponent[] = [];
  @Input() tabTitles: string[];

  constructor() {}

  ngOnInit(): void {}

  addTab(tab: InventoryTabComponent) {
    if (this.tabs.length === 0) {
      tab.active = true;
    }
    this.tabs.push(tab);
  }

  selectTab(tab: InventoryTabComponent) {
    this.tabs.forEach((tab) => (tab.active = false));
    tab.active = true;
  }
}
