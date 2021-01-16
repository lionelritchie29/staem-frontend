import { Component, Input, OnInit } from '@angular/core';
import { GLOBALS } from 'src/app/globals';
import { Game } from 'src/app/models/game';

@Component({
  selector: 'app-featured-card',
  templateUrl: './featured-card.component.html',
  styleUrls: ['./featured-card.component.scss']
})
export class FeaturedCardComponent implements OnInit {

  @Input() game: Game;
  imageUrl: string = '';

  constructor() { }

  ngOnInit(): void {
    if (this.game) {
      this.imageUrl = `${GLOBALS.IMAGE_ENDPOINT}/games/${this.game.id}/header.jpg`;
    }
  }

}
