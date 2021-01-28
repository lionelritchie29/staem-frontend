import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AllProfileBgGqlService extends Query<any> {
  document = gql`
    query getAllProfileBackgrounds {
      profileBackgrounds {
        id
        price
        name
        createdAt
        url
      }
    }
  `;

  get(): Observable<any> {
    return this.watch().valueChanges.pipe(
      map((res) => res.data.profileBackgrounds)
    );
  }
}
