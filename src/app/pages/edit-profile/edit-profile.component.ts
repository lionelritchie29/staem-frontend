import { Component, OnInit } from '@angular/core';
import { getUserImageUrl } from 'src/app/globals';
import { UserAccount } from 'src/app/models/user-account';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  loggedUser: UserAccount = null;
  imageUrl: string = '';

  links = [
    {
      link: '/profile',
      title: 'General',
    },
    {
      link: '/profile',
      title: 'Avatar',
    },
    {
      link: '/profile',
      title: 'Profile Background',
    },
    {
      link: '/profile',
      title: 'Mini Profile',
    },
    {
      link: '/profile',
      title: 'Theme',
    },
    {
      link: '/profile',
      title: 'Featured Badge',
    },
  ];
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe((user) => {
      this.loggedUser = user;
      this.imageUrl = getUserImageUrl(
        this.loggedUser.profile.profilePictureUrl
      );
      this.links[0].link = `/profile/${this.loggedUser.profile.customURL}/edit/info`;
      this.links[1].link = `/profile/${this.loggedUser.profile.customURL}/edit/avatar`;
      this.links[2].link = `/profile/${this.loggedUser.profile.customURL}/edit/background`;
      this.links[3].link = `/profile/${this.loggedUser.profile.customURL}/edit/miniprofile`;
      this.links[4].link = `/profile/${this.loggedUser.profile.customURL}/edit/theme`;
      this.links[5].link = `/profile/${this.loggedUser.profile.customURL}/edit/favoritebadge`;
    });
  }
}
