import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class AllFriendsByUserIdGqlService extends Query<any>{

  document = gql`
    query getFriends($userId:Int) {
      friendsByUserId(id:$userId){
        id,
        accountName,
        status,
        suspended,
        walletAmount,
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
