import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AllImageVideoPostsGqlService extends Query<any> {
  document = gql`
    query getImageVideoPosts {
      imageVideoPosts {
        id
        user {
          id
        }
        description
        likeCount
        dislikeCount
        fileUrl
        type
      }
    }
  `;

  get(): Observable<any> {
    return this.watch().valueChanges.pipe(
      map((res) => res.data.imageVideoPosts)
    );
  }
}
