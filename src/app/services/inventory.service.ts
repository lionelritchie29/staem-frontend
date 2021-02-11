import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { GameItem } from '../models/game-item';

const GET_GAME_TITLE = gql`
  query getGameTitle($id: Int) {
    game(id: $id) {
      id
      title
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  constructor(private apollo: Apollo) {}

  groupInventory(inventory: GameItem[]): any {
    const groupedInventory: any = inventory.reduce((r, a) => {
      r[a.game] = [...(r[a.game] || []), a];
      return r;
    }, {});

    return groupedInventory;
  }

  getGameHeaders(groupedInventory: any) {
    const gameHeaders: any[] = [];
    const groupKeys: string[] = Object.keys(groupedInventory);
    groupKeys.forEach((gameId) => {
      this.apollo
        .query({
          query: GET_GAME_TITLE,
          variables: { id: parseInt(gameId) },
        })
        .pipe(map((res) => (<any>res.data).game))
        .subscribe(async (game) => {
          await gameHeaders.push({ id: game.id, title: game.title });
        });
    });

    return gameHeaders;
  }
}
