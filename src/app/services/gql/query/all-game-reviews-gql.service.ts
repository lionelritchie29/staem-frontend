import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AllGameReviewsGqlService extends Query<any> {
  document = gql`
    query getGameReviews {
      gameReviews {
        id
        gameId
        content
        upvoteCount
        downvoteCount
        isRecommended
        reviewDateTime
        user {
          id
          accountName
          profile {
            profilePictureUrl
          }
        }
      }
    }
  `;

  get(): Observable<any> {
    return this.watch().valueChanges.pipe(map((res) => res.data.gameReviews));
  }
}
