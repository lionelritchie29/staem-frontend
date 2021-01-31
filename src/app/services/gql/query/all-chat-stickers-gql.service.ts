import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AllChatStickersGqlService extends Query<any> {
  document = gql`
    query getChatStickers {
      chatStickers {
        id
        name
        price
        url
        createdAt
      }
    }
  `;

  get(): Observable<any> {
    return this.watch().valueChanges.pipe(map((res) => res.data.chatStickers));
  }
}
