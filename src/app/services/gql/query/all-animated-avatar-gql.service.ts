import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AllAnimatedAvatarGqlService extends Query<any> {
  document = gql`
    query getAnimatedAvatars {
      animatedAvatars {
        id
        name
        price
        url
        createdAt
      }
    }
  `;

  get(): Observable<any> {
    return this.watch().valueChanges.pipe(
      map((res) => res.data.animatedAvatars)
    );
  }
}
