import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class GetReportsByUserIdGqlService extends Query<any>{
  document = gql`
    query getReportsById($id: Int) {
      reportsByUserId(userId:$id) {
        user{
          id,
          accountName
        },
        reporter{
          id,
          accountName
        }
        reason,
        createdAt
      }
    }
  `;
}
