import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GLOBALS } from 'src/app/globals';
import { Game } from 'src/app/models/game';

@Component({
  selector: 'app-category-game-card',
  templateUrl: './category-game-card.component.html',
  styleUrls: ['./category-game-card.component.scss']
})
export class CategoryGameCardComponent implements OnInit {

  @Input() game: Game;
  @Output() openSummary: EventEmitter<any> = new EventEmitter();
  
  isActive:boolean = false;
  imageUrl: string;

  constructor() { }

  ngOnInit(): void {
    this.imageUrl = `${GLOBALS.IMAGE_ENDPOINT}/games/${this.game.id}/header.jpg`;
  }

  showGameSummary() {
    this.isActive = true;
    this.openSummary.emit(this.game);
  }

  unshowGameSummary() {
    this.isActive = false;
  }

}
