import { Component, Input, OnInit } from '@angular/core';
import { getGameImageUrl, GLOBALS } from 'src/app/globals';
import { Game } from 'src/app/models/game';
import { GameImage } from 'src/app/models/game-image';

interface gameImageUrlWithFlag {
  url: string
  active: boolean
}

@Component({
  selector: 'app-game-detail-card',
  templateUrl: './game-detail-card.component.html',
  styleUrls: ['./game-detail-card.component.scss']
})
export class GameDetailCardComponent implements OnInit {

  @Input() game: Game;

  gameHeaderImageUrl: string;
  currentShowingImgUrl: string;
  isPreviewActive: boolean = false;
  gameImagesUrl: gameImageUrlWithFlag[] = [];

  constructor() { }

  ngOnInit(): void {
    this.game.images.forEach((img) => {
      if(img.url === 'header.jpg') {
        this.gameHeaderImageUrl = getGameImageUrl(this.game.id, img.url);
      }else {
        const imgUrl = getGameImageUrl(this.game.id, img.url)
        this.gameImagesUrl.push({url: imgUrl, active: false });
      }
    })

    this.currentShowingImgUrl = getGameImageUrl(this.game.id, this.game.images[0].url);
    this.gameImagesUrl[0].active = true;
    this.setAutomaticSlideshow();
  }

  onPreviewImageClicked(img: gameImageUrlWithFlag): void {
    this.resetActiveState();
    this.currentShowingImgUrl = img.url;
    img.active = true;
  }

  resetActiveState(): void {
    this.gameImagesUrl.forEach((img) => img.active = false)
  }

  goToNextImage(): void {
    for(let i=0; i<this.gameImagesUrl.length; i++) {
      if (this.gameImagesUrl[i].active == true) {
        this.currentShowingImgUrl = this.gameImagesUrl[i+1 == this.gameImagesUrl.length ? 0 : i+1].url;
        this.gameImagesUrl[i+1 == this.gameImagesUrl.length ? 0 : i+1].active = true;
        this.gameImagesUrl[i].active = false;
        break;
      }
    }
  }

  goToPrevImage(): void {
    for(let i=0; i<this.gameImagesUrl.length; i++) {
      if (this.gameImagesUrl[i].active == true) {
        this.currentShowingImgUrl = this.gameImagesUrl[i-1 < 0 ? this.gameImagesUrl.length - 1 : i-1].url;
        this.gameImagesUrl[i-1 < 0 ? this.gameImagesUrl.length - 1 : i-1].active = true;
        this.gameImagesUrl[i].active = false;
        break;
      }
    }
  }

  setAutomaticSlideshow(): void {
    const FOUR_SECONDS = 4000;
    
    setInterval(() => {
      this.goToNextImage();
    } ,FOUR_SECONDS);
  }

}
