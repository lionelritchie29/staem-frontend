import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class GetUserByUrlGqlService extends Query<any>{
  document = gql`
    query getUserByCustomUrl($url:String) {
      userByAccountName(url:$url) {
        id,
        accountName,
        status,
        suspended,
        walletAmount,
        code,
        role{
          name
        },
        profile{
          displayName,
          avatarFrameUrl,
          customURL,
          featuredBadgeUrl,
          level,
          miniProfileBackgroundUrl,
          summary,
          point,
          profileBackgroundUrl,
          profilePictureUrl,
          theme
        }
      }
    }
  `;
}
