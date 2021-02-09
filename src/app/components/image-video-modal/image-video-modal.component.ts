import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { getImageVideoPostImageUrl, getUserImageUrl } from 'src/app/globals';
import { ImageVideoPost } from 'src/app/models/image-video-post';
import { PostComment } from 'src/app/models/post-comment';
import { AuthService } from 'src/app/services/auth.service';
import { ImageVideoModalService } from 'src/app/services/image-video-modal.service';

const IMG_VIDEO_BY_ID = gql`
  query getImageVideoPostById($id: Int) {
    imageVideoPostById(id: $id) {
      id
      user {
        id
        accountName
        profile {
          profilePictureUrl
          customURL
        }
      }
      description
      likeCount
      dislikeCount
      fileUrl
      type
      comments {
        user {
          id
          accountName
          profile {
            profilePictureUrl
            customURL
          }
        }
        comments
        createdAt
      }
    }
  }
`;

const CREATE_COMMENT = gql`
  mutation createPostComment($userId: Int, $postId: Int, $comment: String) {
    createPostComment(userId: $userId, postId: $postId, comment: $comment)
  }
`;

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
  selector: 'app-image-video-modal',
  templateUrl: './image-video-modal.component.html',
  styleUrls: ['./image-video-modal.component.scss'],
})
export class ImageVideoModalComponent implements OnInit {
  constructor(
    private imageVideoModalService: ImageVideoModalService,
    private apollo: Apollo,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}
  postId: number;
  post: ImageVideoPost;
  imgUrl: string = '';
  ownerImgUrl: string = '';
  loggedUserImgUrl: string = '';
  loggedUserId: number;

  comments: PostComment[] = [];
  commenterImgUrl: string[] = [];

  commentForm: FormGroup = this.fb.group({
    comment: ['', Validators.required],
  });

  ngOnInit(): void {
    this.postId = this.imageVideoModalService.postId;
    this.loggedUserId = this.authService.getLoggedInUserId();

    this.apollo
      .query({
        query: IMG_VIDEO_BY_ID,
        variables: { id: this.postId },
      })
      .pipe(map((res) => (<any>res.data).imageVideoPostById))
      .subscribe((post) => {
        this.post = post;
        this.imgUrl = getImageVideoPostImageUrl(post.fileUrl);
        this.ownerImgUrl = getUserImageUrl(post.user.profile.profilePictureUrl);

        this.comments = post.comments;
        console.log(this.comments);
        this.comments.forEach((comment) => {
          this.commenterImgUrl.push(
            getUserImageUrl(comment.user.profile.profilePictureUrl)
          );
        });
      });
  }

  onClose() {
    this.imageVideoModalService.setIsOpen(false);
  }

  addComment() {
    if (this.commentForm.status === 'INVALID') {
      alert('All field must be filled');
      return;
    }

    const userId = this.authService.getLoggedInUserId();
    this.apollo
      .mutate({
        mutation: CREATE_COMMENT,
        variables: {
          userId,
          postId: this.post.id,
          comment: this.commentForm.value.comment,
        },
      })
      .pipe(map((res) => (<any>res.data).createPostComment))
      .subscribe((success) => {
        if (success) {
          alert('Add comment success!');
        } else {
          alert('Add comment failed!');
        }
      });
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
