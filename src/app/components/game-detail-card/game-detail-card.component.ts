import { Component, Input, OnInit } from '@angular/core';
import { GLOBALS } from 'src/app/globals';
import { Game } from 'src/app/models/game';
import { GameImage } from 'src/app/models/game-image';

@Component({
  selector: 'app-game-detail-card',
  templateUrl: './game-detail-card.component.html',
  styleUrls: ['./game-detail-card.component.scss']
})
export class GameDetailCardComponent implements OnInit {

  @Input() game: Game;
  gameImagesUrl: string[] = [];
  gameHeaderImageUrl: string;

  constructor() { }

  ngOnInit(): void {
    this.game.images.forEach((img) => {
      if(img.url === 'header.jpg') {
        this.gameHeaderImageUrl = `${GLOBALS.IMAGE_ENDPOINT}/games/${this.game.id}/${img.url}`;
        console.log(this.gameHeaderImageUrl);
      }else {
        const url = `${GLOBALS.IMAGE_ENDPOINT}/games/${this.game.id}/${img.url}`
        this.gameImagesUrl.push(url);
      }
    })
  }

}
