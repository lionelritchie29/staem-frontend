import { Component, Input, OnInit } from '@angular/core';
import { InventoryTabsComponent } from '../inventory-tabs/inventory-tabs.component';

@Component({
  selector: 'app-inventory-tab',
  templateUrl: './inventory-tab.component.html',
  styleUrls: ['./inventory-tab.component.scss'],
})
export class InventoryTabComponent implements OnInit {
  @Input() tabTitle: string;
  active: boolean = false;
  body: string = Math.random().toString();

  constructor(private tabs: InventoryTabsComponent) {}

  ngOnInit(): void {
    this.tabs.addTab(this);
  }
}
