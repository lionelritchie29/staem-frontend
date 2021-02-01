import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { getUserImageUrl } from 'src/app/globals';
import { GameDiscussion } from 'src/app/models/game-discussion';
import { UserAccount } from 'src/app/models/user-account';
import { AuthService } from 'src/app/services/auth.service';
import { GetGameDiscussionByIdGqlService } from 'src/app/services/gql/query/get-game-discussion-by-id-gql.service';

const CREATE_COMMENT = gql`
  mutation createDiscussionComment(
    $userId: Int
    $postId: Int
    $content: String
  ) {
    createGameDiscussionComment(
      postId: $postId
      userId: $userId
      content: $content
    ) {
      user {
        id
        accountName
        profile {
          profilePictureUrl
        }
      }
      postId
      comments
      createdAt
    }
  }
`;

@Component({
  selector: 'app-discussion-detail',
  templateUrl: './discussion-detail.component.html',
  styleUrls: ['./discussion-detail.component.scss'],
})
export class DiscussionDetailComponent implements OnInit {
  constructor(
    private getGameDiscussionByIdGqlService: GetGameDiscussionByIdGqlService,
    private route: ActivatedRoute,
    private apollo: Apollo,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  discussion: GameDiscussion;
  userImgUrl: string = '';
  commentImgUrl: string[] = [];

  commentForm: FormGroup = this.fb.group({
    content: ['', Validators.required],
  });

  ngOnInit(): void {
    const postId = this.route.snapshot.params.id;

    this.getGameDiscussionByIdGqlService.get(postId).subscribe((discussion) => {
      console.log(discussion);
      this.discussion = discussion;
      this.userImgUrl = getUserImageUrl(
        discussion.user.profile.profilePictureUrl
      );

      discussion.comments.forEach((comment) => {
        this.commentImgUrl.push(
          getUserImageUrl(comment.user.profile.profilePictureUrl)
        );
      });
    });
  }

  onComment() {
    if (this.commentForm.status === 'INVALID') {
      alert('All field must be filled');
      return;
    }

    const userId = this.authService.getLoggedInUserId();

    this.apollo
      .mutate({
        mutation: CREATE_COMMENT,
        variables: {
          postId: this.discussion.id,
          userId,
          content: this.commentForm.value.content,
        },
      })
      .pipe(map((res) => (<any>res.data).createGameDiscussionComment))
      .subscribe((comment) => {
        if (comment.id == 0) {
          alert('Failed when create comment');
        } else {
          alert('Success add comment!');
          window.location.reload();
        }
      });
  }
}
