import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageVideoModalService {
  private _isOpen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  readonly isOpen$ = this._isOpen.asObservable();
  postId: number;

  constructor() {}

  getIsOpen(): boolean {
    return this._isOpen.getValue();
  }

  setIsOpen(status: boolean) {
    this._isOpen.next(status);
  }
}
