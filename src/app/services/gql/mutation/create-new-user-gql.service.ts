import { Injectable } from '@angular/core';
import { Mutation, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class CreateNewUserGqlService extends Mutation{
  document = gql`
    mutation createUser($newUser:NewUser){
      createNewUser(newUser:$newUser) 
    }
  `;
}
