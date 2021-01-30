import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GameItem } from '../models/game-item';

@Injectable({
  providedIn: 'root',
})
export class ListingModalService {
  private _isOpen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  readonly isOpen$ = this._isOpen.asObservable();
  gameItem: GameItem;
  gameName: string;

  constructor() {}

  getIsOpen(): boolean {
    return this._isOpen.getValue();
  }

  setIsOpen(status: boolean) {
    this._isOpen.next(status);
  }

  setGameItem(gameItem: GameItem, gameName: string) {
    this.gameItem = gameItem;
    this.gameName = gameName;
  }
}
