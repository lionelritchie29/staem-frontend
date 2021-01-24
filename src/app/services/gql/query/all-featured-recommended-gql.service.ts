import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { QueryResponse } from 'src/app/models/query-response';

@Injectable({
  providedIn: 'root'
})
export class AllFeaturedRecommendedGqlService extends Query<any>{
  document = gql`
    query featuredGames {
      featuredGames{
        id,
        title,
        description,
        price
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
