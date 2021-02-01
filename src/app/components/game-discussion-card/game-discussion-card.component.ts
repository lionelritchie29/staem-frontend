import { Component, Input, OnInit } from '@angular/core';
import { getGameImageUrl } from 'src/app/globals';
import { Game } from 'src/app/models/game';

@Component({
  selector: 'app-game-discussion-card',
  templateUrl: './game-discussion-card.component.html',
  styleUrls: ['./game-discussion-card.component.scss'],
})
export class GameDiscussionCardComponent implements OnInit {
  constructor() {}

  @Input() game: Game;
  headerUrl: string = '';

  ngOnInit(): void {
    this.headerUrl = getGameImageUrl(this.game.id, 'header.jpg');
  }
}
