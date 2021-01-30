import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AllBuyListingsGqlService extends Query<any> {
  document = gql`
    query getBuyListings {
      buyListings {
        id
        userId
        gameItemId
        price
        quantity
        createdAt
      }
    }
  `;

  get(): Observable<any> {
    return this.watch().valueChanges.pipe(map((res) => res.data.buyListings));
  }
}
