import { Injectable } from '@angular/core';
import { Mutation, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class CreateUserReportGqlService extends Mutation{
  document = gql`
    mutation createReport($userId:Int, $reporterId:Int, $reason:String) {
      createReport(userId:$userId, reporterId:$reporterId, reason:$reason)
    }
  `;
}
