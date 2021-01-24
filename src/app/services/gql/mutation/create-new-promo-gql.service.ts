import { Injectable } from '@angular/core';
import { Mutation, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class CreateNewPromoGqlService extends Mutation{
  document = gql`
    mutation createSale($gameId:Int, $disc:Int, $validTo:String){
      createPromo(gameId:$gameId, discount: $disc,validTo:$validTo){
        gameId,
        validTo,
        discount
      }
    }
  `;
}
