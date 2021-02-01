import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { Game } from 'src/app/models/game';
import { AuthService } from 'src/app/services/auth.service';
import { CreateDiscussionModalService } from 'src/app/services/create-discussion-modal.service';

const CREATE_DISCUSSION = gql`
  mutation createNewDiscussion(
    $userId: Int
    $content: String
    $gameId: Int
    $title: String
  ) {
    createNewGameDiscussion(
      gameId: $gameId
      userId: $userId
      title: $title
      content: $content
    )
  }
`;

const GET_GAMES = gql`
  query getAllGames {
    games {
      id
      title
    }
  }
`;

@Component({
  selector: 'app-create-discussion-modal',
  templateUrl: './create-discussion-modal.component.html',
  styleUrls: ['./create-discussion-modal.component.scss'],
})
export class CreateDiscussionModalComponent implements OnInit {
  constructor(
    private apollo: Apollo,
    private authService: AuthService,
    private fb: FormBuilder,
    private createDiscussionModalService: CreateDiscussionModalService,
    private router: Router
  ) {}

  form: FormGroup = this.fb.group({
    gameId: [1, Validators.required],
    title: ['', Validators.required],
    content: ['', Validators.required],
  });

  games: Game[] = [];

  ngOnInit(): void {
    this.apollo
      .mutate({
        mutation: GET_GAMES,
      })
      .subscribe((res) => (this.games = (<any>res.data).games));
  }

  onCreate() {
    if (this.form.status === 'INVALID') {
      alert('You must fill all field');
    } else {
      const userId = this.authService.getLoggedInUserId();

      this.apollo
        .mutate({
          mutation: CREATE_DISCUSSION,
          variables: {
            gameId: this.form.value.gameId,
            userId: userId,
            content: this.form.value.content,
            title: this.form.value.title,
          },
        })
        .subscribe((res) => {
          if ((<any>res.data).createNewGameDiscussion == -1) {
            alert('Create discussion failed!');
          } else {
            alert('Create discussion success!');
            this.onClose();
            this.router.navigate([
              `/discussion/${(<any>res.data).createNewGameDiscussion}`,
            ]);
          }
        });
    }
  }

  onClose() {
    this.createDiscussionModalService.setIsOpen(false);
  }
}
