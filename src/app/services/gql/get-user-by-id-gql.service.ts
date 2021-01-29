import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetUserByIdGqlService extends Query<any> {
  document = gql`
    query getUser($id: Int) {
      user(id: $id) {
        id
        accountName
        email
        status
        suspendedAt
        walletAmount
        code
        role {
          id
          name
        }
        profile {
          displayName
          customURL
          avatarFrameUrl
          country
          featuredBadgeUrl
          level
          miniProfileBackgroundUrl
          point
          profileBackgroundUrl
          profilePictureUrl
          theme
          summary
          realName
        }
      }
    }
  `;

  get(userId: number): Observable<any> {
    return this.fetch({ id: userId }).pipe(map((res) => (<any>res.data).user));
  }
}
