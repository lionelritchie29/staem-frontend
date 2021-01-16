import { Injectable } from '@angular/core';
import {Query, gql} from 'apollo-angular'
import { QueryResponse } from 'src/app/models/query-response';

@Injectable({
  providedIn: 'root'
})
export class AllSpecialOffersGqlService extends Query<any>{
  document = gql`
    query AllSpecialOffers{
      gamesOnSale{
        id,
        title,
        description,
        price,
        releasedate,
        developer{
          id,
          name
        },
        publisher{
          id,
          name,
        },
        tags{
          id,
          name,
          isAdult
        },
        genres{
          id,
          name
        },
        images{
          url
        }
      }

      gameSales{
        gameId,
        discount,
        validTo
      }
    }
  `;
}
