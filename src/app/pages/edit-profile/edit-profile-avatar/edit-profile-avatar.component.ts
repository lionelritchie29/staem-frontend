import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
import {
  convertFileToBase64,
  getAvatarFrameImageUrl,
  getUserImageUrl,
} from 'src/app/globals';
import { AvatarFrame } from 'src/app/models/avatar-frame';
import { UserAccount } from 'src/app/models/user-account';
import { AuthService } from 'src/app/services/auth.service';

const AVATAR_FRAME_BY_ID = gql`
  query getAvatarFramesByUserId($id: Int) {
    avatarFrameById(userId: $id) {
      id
      name
      url
      price
      createdAt
    }
  }
`;

const GET_USER_AVATAR = gql`
  query getUser($id: Int) {
    user(id: $id) {
      id
      profile {
        profilePictureUrl
        avatarFrameUrl
      }
    }
  }
`;

const UPDATE_USER_AVATAR = gql`
  mutation updateProfileAvatar($id: Int, $imageString: String) {
    updateProfileAvatar(userId: $id, imageString: $imageString)
  }
`;

const UPDATE_USER_AVATAR_FRAME = gql`
  mutation updateProfileAvatarFrame($id: Int, $url: String) {
    updateProfileAvatarFrame(userId: $id, avatarFrameUrl: $url)
  }
`;

@Component({
  selector: 'app-edit-profile-avatar',
  templateUrl: './edit-profile-avatar.component.html',
  styleUrls: ['./edit-profile-avatar.component.scss'],
})
export class EditProfileAvatarComponent implements OnInit {
  constructor(
    private apollo: Apollo,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  avatarForm = this.fb.group({
    file: ['', Validators.required],
  });

  loggedUser: UserAccount;
  avatarFrames: AvatarFrame[] = [];
  avatarFrameImgUrls: string[] = [];
  avatarImgUrl: string = '';
  avatarFrameImgurl: string = '';
  errorMsg: string = '';

  selectedImageFile: FileList;
  selectedFrameUrl: string;

  ngOnInit(): void {
    const userId = this.authService.getLoggedInUserId();

    this.apollo
      .watchQuery({
        query: GET_USER_AVATAR,
        variables: { id: userId },
      })
      .valueChanges.pipe(map((res) => (<any>res.data).user))
      .subscribe((user) => {
        this.loggedUser = user;
        this.avatarImgUrl = getUserImageUrl(
          this.loggedUser.profile.profilePictureUrl
        );
        this.avatarFrameImgurl = getAvatarFrameImageUrl(
          this.loggedUser.profile.avatarFrameUrl
        );
        this.getAvatar();
      });
  }

  getAvatar(): void {
    this.apollo
      .watchQuery({
        query: AVATAR_FRAME_BY_ID,
        variables: { id: this.loggedUser.id },
      })
      .valueChanges.pipe(map((res) => (<any>res.data).avatarFrameById))
      .subscribe((frames) => {
        this.avatarFrames = frames;
        this.avatarFrames.forEach((frame) => {
          const url = getAvatarFrameImageUrl(frame.url);
          this.avatarFrameImgUrls.push(url);
        });
      });
  }

  onFileChange(e: Event): void {
    this.selectedImageFile = (<any>e.target).files[0];
  }

  changeActiveFrame(avatarFrameUrl: string) {
    this.avatarFrameImgurl = getAvatarFrameImageUrl(avatarFrameUrl);
    this.selectedFrameUrl = avatarFrameUrl;
  }

  onSave() {
    if (this.avatarForm.status === 'INVALID') {
      this.errorMsg = 'You must upload a file';
    } else {
      this.errorMsg = '';
      this.updateAvatar();
    }
  }

  async updateAvatar(): Promise<any> {
    const encodedImg: string = await convertFileToBase64(
      this.selectedImageFile
    );

    this.apollo
      .mutate({
        mutation: UPDATE_USER_AVATAR,
        variables: { id: this.loggedUser.id, imageString: encodedImg },
      })
      .pipe(map((res) => (<any>res.data).updateProfileAvatar))
      .subscribe((isSuccess) => {
        if (isSuccess) {
          this.updateAvatarFrame();
        } else {
          alert('Failed when updating avatar');
        }
      });
  }

  updateAvatarFrame(): void {
    this.apollo
      .mutate({
        mutation: UPDATE_USER_AVATAR_FRAME,
        variables: { id: this.loggedUser.id, url: this.selectedFrameUrl },
      })
      .pipe(map((res) => (<any>res.data).updateProfileAvatarFrame))
      .subscribe((isSuccess) => {
        if (isSuccess) {
          alert('Update success!');
          window.location.reload();
        } else {
          alert('Update failed :(');
        }
      });
  }
}
