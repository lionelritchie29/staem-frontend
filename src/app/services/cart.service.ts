import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private KEY: string ="cart"
  constructor() { }

  add(newGame: any) {
    if(localStorage.getItem(this.KEY) != undefined) {
      const storedGame: any[] = this.get();
      if(this._checkGameAlreadyExistInCart(storedGame, newGame)) return;

      storedGame.push(newGame);
      localStorage.setItem(this.KEY, JSON.stringify(storedGame));
    }else{
      const newGame$ = [newGame];
      localStorage.setItem(this.KEY, JSON.stringify(newGame$));
    }
  }

  get():any {
    if(localStorage.getItem(this.KEY) != undefined) {
      return JSON.parse(localStorage.getItem(this.KEY))
    }
  }

  _checkGameAlreadyExistInCart(storedGames: any[], newGame: any): boolean {
    for(let i=0; i< storedGames.length; i++) {
      if (storedGames[i].id === newGame.id)  return true; 
    }
    return false;
  }

  remove(gameId: number):void {
    if(localStorage.getItem(this.KEY) != undefined) {
      const storedGame: any[] = this.get();
      const filteredGame = storedGame.filter((game) => game.id != gameId);
      localStorage.setItem(this.KEY, JSON.stringify(filteredGame));
    }
  }

}