import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { getUserImageUrl } from 'src/app/globals';
import { UserAccount } from 'src/app/models/user-account';
import { AuthService } from 'src/app/services/auth.service';
import { GetUserByIdGqlService } from 'src/app/services/gql/get-user-by-id-gql.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  loggedUser: UserAccount;
  loggedUserImgUrl: string;

  languageList: String[] = [
    '简体中文 (Simplified Chinese)',
    '繁體中文 (Traditional Chinese)',
    '日本語 (Japanese)',
    '한국어 (Korean)',
    'ไทย (Thai)',
    'Български (Bulgarian)',
    'Español - Latinoamérica (Spanish - Latin America)',
    'Français (French)',
    'Italiano (Italian)',
    'Magyar (Hungarian)',
    'Nederlands (Dutch)',
    'Norsk (Norwegian)',
    'Português (Portuguese)',
    'Русский (Russian)',
  ]

  constructor(
    private getUserByIdGqlService: GetUserByIdGqlService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const loggedUserId = this.authService.getLoggedInUserId();

    if (loggedUserId === null) {
      this.loggedUser = null;
    } else {
      this.getUserByIdGqlService
        .watch({id: loggedUserId})
        .valueChanges
        .pipe(map(res => res.data.user))
        .subscribe(user => {
          this.loggedUser = user
          this.loggedUserImgUrl = 
            getUserImageUrl(this.loggedUser.profile.profilePictureUrl);
        });
    }
  }

  showLanguageList(): void {
    const languageListElm: HTMLElement = document.getElementById('language-list');
    
    if (languageListElm.style.display === 'block') {
      languageListElm.style.display = 'none';
    } else {
      languageListElm.style.display = 'block';
    }
  }

  showUserMenuList(): void {
    const userMenuElm: HTMLElement = document.getElementById('user-menu');
    
    if (userMenuElm.style.display === 'block') {
      userMenuElm.style.display = 'none';
    } else {
      userMenuElm.style.display = 'block';
    }
  }

  logout(): void {
    this.authService.logout();
    window.location.reload();
  }

}
