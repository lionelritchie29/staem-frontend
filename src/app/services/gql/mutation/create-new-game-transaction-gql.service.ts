import { Injectable } from '@angular/core';
import { Mutation, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class CreateNewGameTransactionGqlService extends Mutation{
  document = gql`
    mutation createNewTransaction($newTransaction:NewTransaction){
      createNewSelfTransaction(newTransaction:$newTransaction) 
    }
  `;
}
