import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { UserAccount } from 'src/app/models/user-account';
import { AuthService } from 'src/app/services/auth.service';

const GET_INFO = gql`
  query getUser($id: Int) {
    user(id: $id) {
      id
      profile {
        displayName
        customURL
        country
        summary
        realName
      }
    }
  }
`;

const UPDATE_INFO = gql`
  mutation updateProfileInfo($newProfile: NewProfileInfo) {
    updateProfileInfo(newProfile: $newProfile)
  }
`;

@Component({
  selector: 'app-edit-profile-info',
  templateUrl: './edit-profile-info.component.html',
  styleUrls: ['./edit-profile-info.component.scss'],
})
export class EditProfileInfoComponent implements OnInit {
  loggedUser: UserAccount;

  editInfoForm: FormGroup = this.fb.group({
    displayName: ['', Validators.required],
    realName: ['asd', Validators.required],
    customURL: ['', Validators.required],
    country: ['Indonesia', Validators.required],
    summary: ['', Validators.required],
  });

  errorMsg: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private apollo: Apollo
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getLoggedInUserId();
    this.apollo
      .watchQuery({
        query: GET_INFO,
        variables: { id: userId },
      })
      .valueChanges.pipe(map((res) => (<any>res.data).user))
      .subscribe((user) => {
        this.loggedUser = user;
        this.setForm();
      });
  }

  setForm(): void {
    this.editInfoForm.setValue({
      displayName: [this.loggedUser.profile.displayName],
      realName: [this.loggedUser.profile.realName],
      customURL: [this.loggedUser.profile.customURL],
      country: [this.loggedUser.profile.country],
      summary: [this.loggedUser.profile.summary],
    });
  }

  onSave(): void {
    if (this.editInfoForm.invalid) {
      this.errorMsg = 'All field must be filled';
    } else {
      this.apollo
        .mutate({
          mutation: UPDATE_INFO,
          variables: {
            newProfile: {
              userId: this.loggedUser.id,
              displayName: this.editInfoForm.get('displayName').value,
              realName: this.editInfoForm.get('realName').value,
              customUrl: this.editInfoForm.get('customURL').value,
              country: this.editInfoForm.get('country').value,
              summary: this.editInfoForm.get('summary').value,
            },
          },
        })
        .pipe(map((res) => (<any>res.data).updateProfileInfo))
        .subscribe((isSuccess) => {
          if (isSuccess) {
            alert('Profile updated!');
            window.location.reload();
          } else {
            alert('Oops. Error when updating profile.');
          }
        });
    }
  }
}
