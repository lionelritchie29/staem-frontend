import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class GetWishlistByUserIdGqlService extends Query<any> {
  document = gql`
    query getWishlistById($id: Int) {
      wishlistByUserId(userId: $id) {
        userId
        game {
          id
          title
          releasedate
          tags {
            id
            name
          }
          price
          sale {
            discount
            validTo
          }
        }
        createdAt
      }
    }
  `;
}
