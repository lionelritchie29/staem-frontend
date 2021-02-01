import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetGameTopThreeDiscussionGqlService extends Query<any> {
  document = gql`
    query getGames {
      games {
        id
        title
        images {
          url
        }
        topThreeDiscussions {
          id
          title
          content
          createdAt
          user {
            id
            accountName
            profile {
              profilePictureUrl
            }
          }
        }
      }
    }
  `;

  get(): Observable<any> {
    return this.watch().valueChanges.pipe(map((res) => res.data.games));
  }
}
