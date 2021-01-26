import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class GetTagsAndGenresGqlService extends Query<any>{
  document = gql`
    query GetTagAndGenre{
      tags{
        id,
        name
      }
      
      genres{
        id,
        name
      }
    }
  `;
}
