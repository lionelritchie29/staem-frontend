import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { getGameImageUrl } from 'src/app/globals';
import { Game } from 'src/app/models/game';

@Component({
  selector: 'app-manage-game-card',
  templateUrl: './manage-game-card.component.html',
  styleUrls: ['./manage-game-card.component.scss']
})
export class ManageGameCardComponent implements OnInit {

  @Input() game: Game;
  @Output() delete: EventEmitter<any> = new EventEmitter<any>();
  gameHeaderUrl: string = '';



  constructor() { }

  ngOnInit(): void {
    this.gameHeaderUrl = getGameImageUrl(this.game.id, 'header.jpg');
  }

  onDelete() {
    this.delete.emit(this.game.id);
  }

}
