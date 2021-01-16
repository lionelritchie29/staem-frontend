import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class AllRecentlyPublishedGameGqlService extends Query<any>{
  document = gql`
    query getRecentlyPublishedGames{
      recentlyPublishedGames{
        id,
        title,
        price,
        tags{
          name
        },
        images{
          url
        }
      }
    }
  `;
}
