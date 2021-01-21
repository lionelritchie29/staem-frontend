import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class GetGamesByUserIdGqlService extends Query<any>{
  document = gql`
    query gamesByUserId($id:Int) {
      gamesByUserId(id:$id){
        id,
        description,
        developer{
          id,
          name
        },
        genres{
          id,
          name
        },
        images {
          url
        },
        price,
        publisher {
          id,
          name
        },
        releasedate,
        title,
        tags{
          id,
          name
        }
      }
    }
  `;
}
