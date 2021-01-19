import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class GetUserByIdGqlService extends Query<any>{
  document = gql`
    query getUser($id:Int){
      user(id:$id) {
        id,
        accountName,
        email,
        status,
        suspended,
        walletAmount,
        role{
          name
        },
        profile {
          displayName,
          customURL,
          avatarFrameUrl,
          country,
          featuredBadgeUrl,
          level,
          miniProfileBackgroundUrl,
          point,
          profileBackgroundUrl,
          profilePictureUrl,
          theme
        }
      }
    }
  `;
}
