import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetGameDiscussionByIdGqlService extends Query<any> {
  document = gql`
    query getGameDiscussionById($postId: Int) {
      gameDiscussionByPostId(postId: $postId) {
        id
        title
        gameId
        content
        createdAt
        user {
          id
          accountName
          profile {
            profilePictureUrl
          }
        }
        comments {
          user {
            id
            accountName
            profile {
              profilePictureUrl
            }
          }
          comments
          createdAt
        }
      }
    }
  `;

  get(postId: number): Observable<any> {
    return this.watch({ postId }).valueChanges.pipe(
      map((res) => res.data.gameDiscussionByPostId)
    );
  }
}
