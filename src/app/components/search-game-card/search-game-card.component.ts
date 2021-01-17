import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GLOBALS } from 'src/app/globals';
import { Game } from 'src/app/models/game';
import { GameImage } from 'src/app/models/game-image';

@Component({
  selector: 'app-search-game-card',
  templateUrl: './search-game-card.component.html',
  styleUrls: ['./search-game-card.component.scss']
})
export class SearchGameCardComponent implements OnInit {

  @Input() game: Game;
  @Output() openSummary: EventEmitter<any> = new EventEmitter();
  
  isActive:boolean = false;
  headerImageUrl: string;
  overviewImageUrl: string;

  constructor() { }

  ngOnInit(): void {
    this.headerImageUrl = `${GLOBALS.IMAGE_ENDPOINT}/games/${this.game.id}/header.jpg`;
    this.overviewImageUrl = `${GLOBALS.IMAGE_ENDPOINT}/games/${this.game.id}/${this.game.images[0].url}`;
  }

}
