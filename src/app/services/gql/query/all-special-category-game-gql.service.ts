import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class AllSpecialCategoryGameGqlService extends Query<any>{
  document = gql`
    query getSpecialCategoryGames{
      specialGames{
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
