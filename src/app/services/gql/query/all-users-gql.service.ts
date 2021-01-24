import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class AllUsersGqlService extends Query<any>{
  document = gql`
    query getAllUsers{
      users{
        id,
        accountName,
        code,
        email,
        status,
        suspended,
        walletAmount,
        role{
          id,
          name
        },
        profile{
          avatarFrameUrl,
          country,
          customURL,
          displayName,
          featuredBadgeUrl,
          level,
          miniProfileBackgroundUrl,
          point,
          profileBackgroundUrl,
          profilePictureUrl,
          realName,
          summary,
          theme
        }
      }
    }
  `;
}
