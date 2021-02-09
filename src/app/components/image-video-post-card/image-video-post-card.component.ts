import { Component, Input, OnInit } from '@angular/core';
import { ImageVideoPost } from 'src/app/models/image-video-post';
import { getImageVideoPostImageUrl } from 'src/app/globals';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

const ADD_LIKE = gql`
  mutation addImageVideoLike($postId: Int) {
    addImageVideoLike(postId: $postId)
  }
`;

const ADD_DISLIKE = gql`
  mutation addImageVideoDislike($postId: Int) {
    addImageVideoDislike(postId: $postId)
  }
`;

@Component({
  selector: 'app-image-video-post-card',
  templateUrl: './image-video-post-card.component.html',
  styleUrls: ['./image-video-post-card.component.scss'],
})
export class ImageVideoPostCardComponent implements OnInit {
  @Input() post: ImageVideoPost;
  imgUrl: string = '';
  loggedUserId: number;

  constructor(private apollo: Apollo, private authService: AuthService) {}

  ngOnInit(): void {
    this.imgUrl = getImageVideoPostImageUrl(this.post.fileUrl);
    this.loggedUserId = this.authService.getLoggedInUserId();
  }

  onLike() {
    if (!this.loggedUserId) {
      alert('You are not logged in yet');
      return;
    }

    this.apollo
      .mutate({
        mutation: ADD_LIKE,
        variables: { postId: this.post.id },
      })
      .pipe(map((res) => (<any>res.data).addImageVideoLike))
      .subscribe((success) => {
        if (success) {
          alert('Success add like!');
          window.location.reload();
        } else {
          alert('Failed add like!');
        }
      });
  }

  onDislike() {
    if (!this.loggedUserId) {
      alert('You are not logged in yet');
      return;
    }

    this.apollo
      .mutate({
        mutation: ADD_DISLIKE,
        variables: { postId: this.post.id },
      })
      .pipe(map((res) => (<any>res.data).addImageVideoDislike))
      .subscribe((success) => {
        if (success) {
          alert('Success add dislike!');
          window.location.reload();
        } else {
          alert('Failed add dislike!');
        }
      });
  }
}
