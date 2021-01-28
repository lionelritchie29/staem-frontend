import { Component, Input, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
import {
  getAvatarFrameImageUrl,
  getMiniProfileBgUrl,
  getProfileBgUrl,
} from 'src/app/globals';
import { UserAccount } from 'src/app/models/user-account';
import { AuthService } from 'src/app/services/auth.service';

const CREATE_AVATAR_FRAME_TRX = gql`
  mutation createAvatarFrameTransaction($userId: Int, $itemId: Int) {
    createAvatarFrameTransaction(userId: $userId, itemId: $itemId)
  }
`;

const CREATE_PROFILE_BG_TRX = gql`
  mutation createProfileBgTransaction($userId: Int, $itemId: Int) {
    createProfileBgTransaction(userId: $userId, itemId: $itemId)
  }
`;

const CREATE_MINI_PROFILE_BG_TRX = gql`
  mutation createMiniProfileBgTransaction($userId: Int, $itemId: Int) {
    createMiniProfileTransaction(userId: $userId, itemId: $itemId)
  }
`;

@Component({
  selector: 'app-point-item-card',
  templateUrl: './point-item-card.component.html',
  styleUrls: ['./point-item-card.component.scss'],
})
export class PointItemCardComponent implements OnInit {
  @Input() item: any;
  @Input() type: string;
  @Input() isOwned: boolean;
  imgUrl: string;
  loggedUser: UserAccount;

  constructor(private apollo: Apollo, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe((user) => (this.loggedUser = user));

    switch (this.type) {
      case 'Avatar Frame':
        this.imgUrl = getAvatarFrameImageUrl(this.item.url);
        break;
      case 'Profile Background':
        this.imgUrl = getProfileBgUrl(this.item.url);
        break;
      case 'Mini Profile Background':
        this.imgUrl = getMiniProfileBgUrl(this.item.url);
        break;
    }
  }

  onBuy() {
    if (this.isOwned) {
      alert('You already own this item!');
    } else if (this.loggedUser.profile.point < this.item.price) {
      alert('Not enough point');
    } else {
      if (confirm('Are you sure you want to buy this item ? ')) {
        this.makeTransaction();
      }
    }
  }

  makeTransaction() {
    if (this.type == 'Avatar Frame') {
      this.createAvatarFrameTrx();
    } else if (this.type == 'Profile Background') {
      this.createProfileBgTrx();
    } else if (this.type == 'Mini Profile Background') {
      this.createMiniProfileTrx();
    }
  }

  createAvatarFrameTrx() {
    this.apollo
      .mutate({
        mutation: CREATE_AVATAR_FRAME_TRX,
        variables: { userId: this.loggedUser.id, itemId: this.item.id },
      })
      .pipe(map((res) => (<any>res.data).createAvatarFrameTransaction))
      .subscribe((isSuccess) => {
        if (isSuccess) {
          alert(
            `${this.item.name} (Avatar Frame) has been successfully added!`
          );
          this.item.isOwned = true;
        } else {
          alert('Oops. something is wrong when creating this transaction');
        }
      });
  }

  createProfileBgTrx() {
    this.apollo
      .mutate({
        mutation: CREATE_PROFILE_BG_TRX,
        variables: { userId: this.loggedUser.id, itemId: this.item.id },
      })
      .pipe(map((res) => (<any>res.data).createProfileBgTransaction))
      .subscribe((isSuccess) => {
        if (isSuccess) {
          alert(`${this.item.name} (Profile Bg) has been successfully added!`);
          this.item.isOwned = true;
        } else {
          alert('Oops. something is wrong when creating this transaction');
        }
      });
  }

  createMiniProfileTrx() {
    this.apollo
      .mutate({
        mutation: CREATE_MINI_PROFILE_BG_TRX,
        variables: { userId: this.loggedUser.id, itemId: this.item.id },
      })
      .pipe(map((res) => (<any>res.data).createMiniProfileTransaction))
      .subscribe((isSuccess) => {
        if (isSuccess) {
          alert(
            `${this.item.name} (Mini Profile Bg) has been successfully added!`
          );
          this.item.isOwned = true;
        } else {
          alert('Oops. something is wrong when creating this transaction');
        }
      });
  }
}
