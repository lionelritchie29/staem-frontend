import { Component, Input, OnInit } from '@angular/core';
import { getGameImageUrl } from 'src/app/globals';
import { Game } from 'src/app/models/game';

@Component({
  selector: 'app-user-game-card',
  templateUrl: './user-game-card.component.html',
  styleUrls: ['./user-game-card.component.scss']
})
export class UserGameCardComponent implements OnInit {

  @Input() game: Game;
  imageUrl: string = '';

  constructor() { }

  ngOnInit(): void {
    this.imageUrl = getGameImageUrl(this.game.id, "header.jpg");
  }

}
