import { Component, Input, OnInit } from '@angular/core';
import { getGameImageUrl } from 'src/app/globals';
import { Game } from 'src/app/models/game';

@Component({
  selector: 'app-manage-game-card',
  templateUrl: './manage-game-card.component.html',
  styleUrls: ['./manage-game-card.component.scss']
})
export class ManageGameCardComponent implements OnInit {

  @Input() game: Game;
  gameHeaderUrl: string = '';

  constructor() { }

  ngOnInit(): void {
    this.gameHeaderUrl = getGameImageUrl(this.game.id, 'header.jpg');
  }

}
