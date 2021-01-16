import { Component, OnInit } from '@angular/core';
import { CategoryTabComponent } from '../category-tab/category-tab.component';

@Component({
  selector: 'app-category-tabs',
  templateUrl: './category-tabs.component.html',
  styleUrls: ['./category-tabs.component.scss']
})
export class CategoryTabsComponent implements OnInit {

  tabs: CategoryTabComponent[] = []

  constructor() { }

  ngOnInit(): void {
  }

  addTab(tab: CategoryTabComponent) {
    if(this.tabs.length === 0) {
      tab.active = true;
    }
    this.tabs.push(tab);
  }

  selectTab(tab: CategoryTabComponent) {
    this.tabs.forEach((tab) => tab.active = false);
    tab.active = true;
  }

}
