import { Injectable } from '@angular/core';
import { Mutation, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class CreateCommentGqlService extends Mutation{
  document = gql`
    mutation createComment($src:Int, $dest:Int, $content:String){
      createNewComment(srcUserId:$src, destUserId:$dest, content:$content){
        srcUser{
          id
        }
        destUser{
          id
        },
        content,
        createdAt
      }
    }
  `;
}
