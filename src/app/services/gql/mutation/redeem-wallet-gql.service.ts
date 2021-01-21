import { Injectable } from '@angular/core';
import { Mutation, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class RedeemWalletGqlService extends Mutation{
  document = gql`
    mutation redeemWallet($userId:Int, $code:String) {
      redeemWallet(userId:$userId,code:$code){
        id,
        amount,
        code,
        isValid
      }
    }
  `;
}
