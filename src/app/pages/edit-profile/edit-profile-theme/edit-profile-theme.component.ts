import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

const GET_USER_INFO = gql`
  query getUser($id: Int) {
    user(id: $id) {
      id
      profile {
        theme
      }
    }
  }
`;

const UPDATE_THEME = gql`
  mutation updateProfileTheme($id: Int, $hexCode: String) {
    updateProfileTheme(userId: $id, hexCode: $hexCode)
  }
`;

@Component({
  selector: 'app-edit-profile-theme',
  templateUrl: './edit-profile-theme.component.html',
  styleUrls: ['./edit-profile-theme.component.scss'],
})
export class EditProfileThemeComponent implements OnInit {
  THEMES = {
    DEFAULT: '#222431',
    SUMMER: '#B57213', //summer
    MIDNIGHT: '#1F1D69',
    STEEL: '#3D4A59',
    COSMIC: '#772478',
    DARKMODE: '#111111',
  };

  CURRENT_THEMES: string = '#222431';

  constructor(private authService: AuthService, private apollo: Apollo) {}

  ngOnInit(): void {
    const userId = this.authService.getLoggedInUserId();

    this.apollo
      .watchQuery({
        query: GET_USER_INFO,
        variables: { id: userId },
      })
      .valueChanges.pipe(map((res) => (<any>res.data).user))
      .subscribe((user) => {
        this.CURRENT_THEMES = user.profile.theme;
      });
  }

  onChangeTheme(hexCode: string) {
    this.CURRENT_THEMES = hexCode;
  }

  onSave(): void {
    const userId = this.authService.getLoggedInUserId();

    this.apollo
      .mutate({
        mutation: UPDATE_THEME,
        variables: { id: userId, hexCode: this.CURRENT_THEMES },
      })
      .pipe(map((res) => (<any>res.data).updateProfileTheme))
      .subscribe((isSuccess) => {
        if (isSuccess) {
          alert('Theme updated!');
          window.location.reload();
        } else {
          alert('Oops. Error when updating theme');
        }
      });
  }
}
