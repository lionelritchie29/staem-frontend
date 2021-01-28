import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class AllGamesLimitOffsetGqlService extends Query<any> {
  document = gql`
    query getGamesLimitOffset($limit: Int, $offset: Int) {
      gamesLimitOffset(limit: $limit, offset: $offset) {
        totalCount
        games {
          id
          title
          description
          developer {
            id
            name
          }
          publisher {
            id
            name
          }
          genres {
            id
            name
          }
          tags {
            id
            name
          }
          images {
            url
          }
          price
          releasedate
          systemReq {
            graphics
            directX
            isRecommended
            memory
            note
            operatingSystem
            processor
            storage
          }
        }
      }
    }
  `;
}
