import { Component, OnInit } from '@angular/core';
import { CommunityTabComponent } from '../community-tab/community-tab.component';

@Component({
  selector: 'app-community-tabs',
  templateUrl: './community-tabs.component.html',
  styleUrls: ['./community-tabs.component.scss'],
})
export class CommunityTabsComponent implements OnInit {
  tabs: CommunityTabComponent[] = [];

  constructor() {}

  ngOnInit(): void {}

  addTab(tab: CommunityTabComponent) {
    if (this.tabs.length === 0) {
      tab.active = true;
    }
    this.tabs.push(tab);
  }

  selectTab(tab: CommunityTabComponent) {
    this.tabs.forEach((tab) => (tab.active = false));
    tab.active = true;
  }
}
