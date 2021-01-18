import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class RemoveCartModalService {

  private _isOpen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  readonly isOpen$ = this._isOpen.asObservable();
  private _gameIdToBeRemoved: number = -1;

  constructor() {}

  getIsOpen(): boolean {
    return this._isOpen.getValue();
  }

  setIsOpen(status: boolean) {
    this._isOpen.next(status);
  }

  setGameId(gameId: number) {
    this._gameIdToBeRemoved = gameId;
  }

  getGameId() {
    return this._gameIdToBeRemoved;
  }
}
