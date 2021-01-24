import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class AllCommunityRecommendedGamesGqlService extends Query<any>{
  document = gql`
    query getCommunityRecommendedGames {
      communityRecommendedGames{
        id,
        title,
        description,
        price,
        images{
          url
        },
        sale{
          gameId,
          validTo,
          discount
        }
      }
    }
  `;
}
