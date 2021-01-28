import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { AuthService } from '../../auth.service';

@Injectable({
  providedIn: 'root',
})
export class GetUserInventoryGqlService extends Query<any> {
  document = gql`
    query getUserInventory($id: Int) {
      user(id: $id) {
        id
        inventory {
          id
          game
          description
          gameItemCategory
          image
          name
        }
      }
    }
  `;
}
