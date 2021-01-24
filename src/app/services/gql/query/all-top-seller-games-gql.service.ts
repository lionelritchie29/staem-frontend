import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class AllTopSellerGamesGqlService extends Query<any>{
  document = gql`
  query getTopSellerGames{
    topSellerGames{
      id,
      title,
      price,
      tags{
        name
      },
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
