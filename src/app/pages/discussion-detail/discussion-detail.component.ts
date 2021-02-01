import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getUserImageUrl } from 'src/app/globals';
import { GameDiscussion } from 'src/app/models/game-discussion';
import { UserAccount } from 'src/app/models/user-account';
import { GetGameDiscussionByIdGqlService } from 'src/app/services/gql/query/get-game-discussion-by-id-gql.service';

@Component({
  selector: 'app-discussion-detail',
  templateUrl: './discussion-detail.component.html',
  styleUrls: ['./discussion-detail.component.scss'],
})
export class DiscussionDetailComponent implements OnInit {
  constructor(
    private getGameDiscussionByIdGqlService: GetGameDiscussionByIdGqlService,
    private route: ActivatedRoute
  ) {}
  discussion: GameDiscussion;
  userImgUrl: string = '';
  commentImgUrl: string[] = [];

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
}
