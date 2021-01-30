import { Component, Input, OnInit } from '@angular/core';
import { getGameItemImageUrl } from 'src/app/globals';
import { Game } from 'src/app/models/game';
import { GameItem } from 'src/app/models/game-item';

@Component({
  selector: 'app-market-item-card',
  templateUrl: './market-item-card.component.html',
  styleUrls: ['./market-item-card.component.scss'],
})
export class MarketItemCardComponent implements OnInit {
  @Input() item: any;
  @Input() game: Game;
  imgUrl: string = '';

  constructor() {}

  ngOnInit(): void {
    console.log(this.item);
    this.imgUrl = getGameItemImageUrl(
      this.item.gameItem.game,
      this.item.gameItem.image
    );
  }
}
