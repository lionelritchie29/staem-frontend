import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AllAvatarFramesGqlService extends Query<any> {
  document = gql`
    query getAllAvatarFrames {
      avatarFrames {
        id
        price
        name
        createdAt
        url
      }
    }
  `;

  get(): Observable<any> {
    return this.watch().valueChanges.pipe(map((res) => res.data.avatarFrames));
  }
}
