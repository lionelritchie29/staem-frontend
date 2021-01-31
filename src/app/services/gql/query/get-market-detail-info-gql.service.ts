import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class GetMarketDetailInfoGqlService extends Query<any> {
  document = gql`
    query getMarketDetailInfo($gameItemId: Int, $userId: Int) {
      gameItem(id: $gameItemId) {
        id
        name
        description
        image
        game
      }

      sellListingGroupedByPrice(gameItemId: $gameItemId) {
        price
        quantity
      }

      buyListingGroupedByPrice(gameItemId: $gameItemId) {
        price
        quantity
      }

      buyListingByUserAndGameItemId(userId: $userId, gameItemId: $gameItemId) {
        id
        gameItemId
        price
        quantity
        createdAt
      }

      sellListingByUserAndGameItemId(userId: $userId, gameItemId: $gameItemId) {
        id
        gameItemId
        price
        quantity
        createdAt
      }
    }
  `;
}
