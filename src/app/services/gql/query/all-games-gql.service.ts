import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class AllGamesGqlService extends Query<any>{
  document = gql`
    query getAllGames{
      games{
        id,
        title,
        description,
        developer {
          id,
          name
        },
        publisher{
          id,
          name
        },
        genres{
          id,
          name
        },
        tags{
          id,
          name,
        },
        images{
          url
        },
        price,
        releasedate,
        systemReq{
          graphics,
          directX,
          isRecommended,
          memory,
          note,
          operatingSystem,
          processor,
          storage,
        },
      }
    }
  `;
}
