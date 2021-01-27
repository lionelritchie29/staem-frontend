import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { ProfileBackground } from 'src/app/models/profile-background';
import { UserAccount } from 'src/app/models/user-account';
import { AuthService } from 'src/app/services/auth.service';
import { getProfileBgUrl } from 'src/app/globals';

const GET_USER_INFO = gql`
  query getUser($id: Int) {
    user(id: $id) {
      id
      profile {
        profileBackgroundUrl
      }
    }
  }
`;

const GET_PROFILE_BG_BY_USER_ID = gql`
  query getProfileBgByUserId($id: Int) {
    profileBackgroundById(userId: $id) {
      id
      name
      url
      price
      createdAt
    }
  }
`;

const UPDATE_PROFILE_BACKGROUND = gql`
  mutation updateProfileBackground($id: Int, $url: String) {
    updateProfileBackground(userId: $id, profileBackgroundUrl: $url)
  }
`;

@Component({
  selector: 'app-edit-profile-background',
  templateUrl: './edit-profile-background.component.html',
  styleUrls: ['./edit-profile-background.component.scss'],
})
export class EditProfileBackgroundComponent implements OnInit {
  constructor(private authService: AuthService, private apollo: Apollo) {}

  loggedUser: UserAccount;
  profileBackgrounds: ProfileBackground[] = [];
  profileBackgroundsUrl: string[] = [];
  activeBackgroundImageUrl: string = '';

  selectedBgUrl: string = '';

  ngOnInit(): void {
    const userId = this.authService.getLoggedInUserId();

    this.apollo
      .watchQuery({
        query: GET_USER_INFO,
        variables: { id: userId },
      })
      .valueChanges.pipe(map((res) => (<any>res.data).user))
      .subscribe((user) => {
        this.loggedUser = user;
        this.activeBackgroundImageUrl = getProfileBgUrl(
          this.loggedUser.profile.profileBackgroundUrl
        );
        this.getBackgrounds();
      });
  }

  getBackgrounds(): void {
    this.apollo
      .watchQuery({
        query: GET_PROFILE_BG_BY_USER_ID,
        variables: { id: this.loggedUser.id },
      })
      .valueChanges.pipe(map((res) => (<any>res.data).profileBackgroundById))
      .subscribe((bgs) => {
        this.profileBackgrounds = bgs;
        console.log(this.profileBackgrounds);
        this.profileBackgrounds.forEach((bg) =>
          this.profileBackgroundsUrl.push(getProfileBgUrl(bg.url))
        );
      });
  }

  onChangeBg(bg: ProfileBackground): void {
    this.selectedBgUrl = bg.url;
    this.activeBackgroundImageUrl = getProfileBgUrl(bg.url);
  }

  onSave() {
    this.apollo
      .mutate({
        mutation: UPDATE_PROFILE_BACKGROUND,
        variables: { id: this.loggedUser.id, url: this.selectedBgUrl },
      })
      .pipe(map((res) => (<any>res.data).updateProfileBackground))
      .subscribe((isSuccess) => {
        if (isSuccess) {
          alert('Profile background updated!');
        } else {
          alert('Failed when updating background');
        }
      });
  }
}
