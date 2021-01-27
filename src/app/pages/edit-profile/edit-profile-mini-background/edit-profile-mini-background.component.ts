import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { MiniProfileBackground } from 'src/app/models/mini-profile-background';
import { UserAccount } from 'src/app/models/user-account';
import { AuthService } from 'src/app/services/auth.service';
import { getMiniProfileBgUrl } from 'src/app/globals';

const GET_MINI_BG_BY_ID = gql`
  query getMiniProfileBgByUserId($id: Int) {
    miniProfileBackgroundById(userId: $id) {
      id
      name
      url
      price
      createdAt
    }
  }
`;

const GET_USER_INFO = gql`
  query getUser($id: Int) {
    user(id: $id) {
      id
      profile {
        miniProfileBackgroundUrl
      }
    }
  }
`;

const UPDATE_MINI_BG = gql`
  mutation updateMiniProfileBackground($id: Int, $url: String) {
    updateMiniProfileBackground(userId: $id, miniProfileBackgroundUrl: $url)
  }
`;

@Component({
  selector: 'app-edit-profile-mini-background',
  templateUrl: './edit-profile-mini-background.component.html',
  styleUrls: ['./edit-profile-mini-background.component.scss'],
})
export class EditProfileMiniBackgroundComponent implements OnInit {
  constructor(private authService: AuthService, private apollo: Apollo) {}

  loggedUser: UserAccount;
  profileBackgrounds: MiniProfileBackground[] = [];
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
        this.activeBackgroundImageUrl = getMiniProfileBgUrl(
          this.loggedUser.profile.miniProfileBackgroundUrl
        );
        this.getBackgrounds();
      });
  }

  getBackgrounds(): void {
    this.apollo
      .watchQuery({
        query: GET_MINI_BG_BY_ID,
        variables: { id: this.loggedUser.id },
      })
      .valueChanges.pipe(
        map((res) => (<any>res.data).miniProfileBackgroundById)
      )
      .subscribe((bgs) => {
        this.profileBackgrounds = bgs;
        this.profileBackgrounds.forEach((bg) =>
          this.profileBackgroundsUrl.push(getMiniProfileBgUrl(bg.url))
        );
      });
  }

  onChangeBg(bg: MiniProfileBackground): void {
    this.selectedBgUrl = bg.url;
    this.activeBackgroundImageUrl = getMiniProfileBgUrl(bg.url);
  }

  onSave() {
    this.apollo
      .mutate({
        mutation: UPDATE_MINI_BG,
        variables: { id: this.loggedUser.id, url: this.selectedBgUrl },
      })
      .pipe(map((res) => (<any>res.data).updateMiniProfileBackground))
      .subscribe((isSuccess) => {
        if (isSuccess) {
          alert('Mini profile background updated!');
        } else {
          alert('Failed when updating mini background');
        }
      });
  }
}
