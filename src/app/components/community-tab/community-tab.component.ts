import { Component, Input, OnInit } from '@angular/core';
import { ImageVideoPost } from 'src/app/models/image-video-post';
import { AllImageVideoPostsGqlService } from 'src/app/services/gql/query/all-image-video-posts-gql.service';
import { CommunityTabsComponent } from '../community-tabs/community-tabs.component';

@Component({
  selector: 'app-community-tab',
  templateUrl: './community-tab.component.html',
  styleUrls: ['./community-tab.component.scss'],
})
export class CommunityTabComponent implements OnInit {
  constructor(
    private tabs: CommunityTabsComponent,
    private allImageVideoPostsGqlService: AllImageVideoPostsGqlService
  ) {}

  active: boolean = false;
  @Input() tabTitle: string;
  body: string = Math.random().toString();

  imageVideoPosts: ImageVideoPost[] = [];

  ngOnInit(): void {
    this.tabs.addTab(this);

    if (this.tabTitle == 'Image and Videos') {
      this.fetchImagesAndVideos();
    }
  }

  fetchImagesAndVideos(): void {
    this.allImageVideoPostsGqlService
      .get()
      .subscribe((posts) => (this.imageVideoPosts = posts));
  }
}
