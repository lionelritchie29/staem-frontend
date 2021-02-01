import { Component, Input, OnInit } from '@angular/core';
import { ImageVideoPost } from 'src/app/models/image-video-post';
import { getImageVideoPostImageUrl } from 'src/app/globals';

@Component({
  selector: 'app-image-video-post-card',
  templateUrl: './image-video-post-card.component.html',
  styleUrls: ['./image-video-post-card.component.scss'],
})
export class ImageVideoPostCardComponent implements OnInit {
  @Input() post: ImageVideoPost;
  imgUrl: string = '';

  constructor() {}

  ngOnInit(): void {
    this.imgUrl = getImageVideoPostImageUrl(this.post.fileUrl);
  }
}
