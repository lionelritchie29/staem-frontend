import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class GamesBySearchQueryGqlService extends Query<any> {
  document = gql`
    query searchGame($query: String, $limit: Int, $offset: Int) {
      gamesByTitlelimitOffset(query: $query, limit: $limit, offset: $offset) {
        id
        title
        releasedate
        price
        images {
          url
        }
        tags {
          id
          name
        }
      }
    }
  `;
}
