import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { AvatarFrame } from 'src/app/models/avatar-frame';
import { MiniProfileBackground } from 'src/app/models/mini-profile-background';
import { ProfileBackground } from 'src/app/models/profile-background';
import { AuthService } from 'src/app/services/auth.service';
import { AllAvatarFramesGqlService } from 'src/app/services/gql/query/all-avatar-frames-gql.service';
import { AllMiniProfileBgGqlService } from 'src/app/services/gql/query/all-mini-profile-bg-gql.service';
import { AllProfileBgGqlService } from 'src/app/services/gql/query/all-profile-bg-gql.service';

const GET_USER_INFO = gql`
  query user($id: Int) {
    user(id: $id) {
      id
      profile {
        avatarFrames {
          id
        }
        miniProfileBackgrounds {
          id
        }
        profileBackgrounds {
          id
        }
        point
      }
    }
  }
`;

@Component({
  selector: 'app-point-shop',
  templateUrl: './point-shop.component.html',
  styleUrls: ['./point-shop.component.scss'],
})
export class PointShopComponent implements OnInit {
  constructor(
    private allAvatarFramesGqlService: AllAvatarFramesGqlService,
    private allProfileBgGqlService: AllProfileBgGqlService,
    private allMiniProfileBgGqlService: AllMiniProfileBgGqlService,
    private apollo: Apollo,
    private authService: AuthService
  ) {}

  avatarFrames: AvatarFrame[] = [];
  profileBackgrounds: ProfileBackground[] = [];
  miniProfileBackgrounds: MiniProfileBackground[] = [];

  ownedAvatarFrames: number[] = [];
  ownedProfileBackgrounds: number[] = [];
  ownedMiniProfileBackgrounds: number[] = [];
  point: number = 0;

  ngOnInit(): void {
    const userId = this.authService.getLoggedInUserId();
    this.apollo
      .watchQuery({
        query: GET_USER_INFO,
        variables: { id: userId },
      })
      .valueChanges.pipe(map((res) => (<any>res.data).user))
      .subscribe((user) => {
        user.profile.avatarFrames.forEach((frame) => {
          this.ownedAvatarFrames.push(frame.id);
        });

        user.profile.profileBackgrounds.forEach((bg) => {
          this.ownedProfileBackgrounds.push(bg.id);
        });

        user.profile.miniProfileBackgrounds.forEach((bg) => {
          this.ownedMiniProfileBackgrounds.push(bg.id);
        });

        this.point = user.profile.point;

        this.getData();
      });
  }

  getData() {
    this.allAvatarFramesGqlService
      .get()
      .subscribe((frames) => (this.avatarFrames = frames));

    this.allProfileBgGqlService
      .get()
      .subscribe((bgs) => (this.profileBackgrounds = bgs));

    this.allMiniProfileBgGqlService
      .get()
      .subscribe((bgs) => (this.miniProfileBackgrounds = bgs));
  }
}
