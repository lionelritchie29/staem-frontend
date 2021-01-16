import { Component, Input, OnInit } from '@angular/core';
import { GLOBALS } from 'src/app/globals';
import { Game } from 'src/app/models/game';
import { GameSale } from 'src/app/models/game-sale';

@Component({
  selector: 'app-special-offers-card',
  templateUrl: './special-offers-card.component.html',
  styleUrls: ['./special-offers-card.component.scss']
})
export class SpecialOffersCardComponent implements OnInit {

  @Input() game: Game;
  @Input() sale: GameSale;
  imageUrl: string = '';

  constructor() { }

  ngOnInit(): void {
    if (this.game) {
      this.imageUrl = `${GLOBALS.IMAGE_ENDPOINT}/games/${this.game.id}/header.jpg`;
    }
  }

}
