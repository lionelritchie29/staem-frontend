import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class GetGamesByTitleLimit5GqlService extends Query<any>{
  document = gql`
    query getGamesByTitleLimit5($query:String) {
      gamesByTitleLimit5(query:$query){
        id,
        title,
        price,
        images{
          url
        },
        sale{
          discount,
          validTo
        }
      }
    }
  `;
}
