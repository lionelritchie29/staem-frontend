import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { AnimatedAvatar } from 'src/app/models/animated-avatar';
import { AvatarFrame } from 'src/app/models/avatar-frame';
import { ChatSticker } from 'src/app/models/chat-sticker';
import { MiniProfileBackground } from 'src/app/models/mini-profile-background';
import { ProfileBackground } from 'src/app/models/profile-background';
import { AuthService } from 'src/app/services/auth.service';
import { AllAnimatedAvatarGqlService } from 'src/app/services/gql/query/all-animated-avatar-gql.service';
import { AllAvatarFramesGqlService } from 'src/app/services/gql/query/all-avatar-frames-gql.service';
import { AllChatStickersGqlService } from 'src/app/services/gql/query/all-chat-stickers-gql.service';
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
        chatStickers {
          id
        }
        animatedAvatars {
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
    private allAnimatedAvatarGqlService: AllAnimatedAvatarGqlService,
    private allChatStickersGqlService: AllChatStickersGqlService,
    private apollo: Apollo,
    private authService: AuthService
  ) {}

  avatarFrames: AvatarFrame[] = [];
  profileBackgrounds: ProfileBackground[] = [];
  miniProfileBackgrounds: MiniProfileBackground[] = [];
  chatStickers: ChatSticker[] = [];
  animatedAvatars: AnimatedAvatar[] = [];

  ownedAvatarFrames: number[] = [];
  ownedProfileBackgrounds: number[] = [];
  ownedMiniProfileBackgrounds: number[] = [];
  ownedChatStickers: number[] = [];
  ownedAnimatedAvatars: number[] = [];
  point: number = 0;

  ngOnInit(): void {
    const userId = this.authService.getLoggedInUserId();

    if (userId) {
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

          user.profile.chatStickers.forEach((sticker) => {
            this.ownedChatStickers.push(sticker.id);
          });

          user.profile.animatedAvatars.forEach((avatar) => {
            this.ownedAnimatedAvatars.push(avatar.id);
          });

          this.point = user.profile.point;

          this.getData();
        });
    } else {
      this.getData();
    }
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

    this.allAnimatedAvatarGqlService
      .get()
      .subscribe((ava) => (this.animatedAvatars = ava));

    this.allChatStickersGqlService
      .get()
      .subscribe((stickers) => (this.chatStickers = stickers));
  }
}
