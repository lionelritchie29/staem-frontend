import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class GameByIdGqlService extends Query<any>{
  document = gql`
    query getGameById($id: Int) {
      game(id:$id){
        id,
        title,
        description,
        price,
        releasedate,
        publisher{
          id,
          name
        },
        developer{
          id,
          name
        },
        images{
          url
        },
        tags{
          id,
          name
        },
        sale{
          gameId,
          validTo,
          discount
        },
        systemReq{
          note,
          isRecommended,
          note,
          operatingSystem,
          processor,
          memory,
          graphics,
          directX,
          storage
        }
      }
    }
  `;
}
