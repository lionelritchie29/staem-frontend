import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AllSellListingsGqlService extends Query<any> {
  document = gql`
    query getSellListings {
      sellListings {
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
    return this.watch().valueChanges.pipe(map((res) => res.data.sellListings));
  }
}
