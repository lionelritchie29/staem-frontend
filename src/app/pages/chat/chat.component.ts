import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { ChatMessage } from 'src/app/models/chat-message';
import { UserAccount } from 'src/app/models/user-account';
import { AuthService } from 'src/app/services/auth.service';
import { GetUserByIdGqlService } from 'src/app/services/gql/get-user-by-id-gql.service';

const SEND_CHAT = gql`
  mutation createChats($senderId: Int, $recipientId: Int, $message: String) {
    addChatMessage(
      senderId: $senderId
      recipientId: $recipientId
      message: $message
    )
  }
`;

const GET_CHATS = gql`
  query getChats($senderId: Int, $recipientId: Int) {
    chats(senderId: $senderId, recipientId: $recipientId) {
      id
      senderId
      recipientId
      message
      createdAt
    }
  }
`;

const GET_LATEST_CHAT = gql`
  subscription getLatestChat($senderId: Int, $recipientId: Int) {
    latestChat(senderId: $senderId, recipientId: $recipientId) {
      id
      senderId
      recipientId
      message
      createdAt
    }
  }
`;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private apollo: Apollo,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private getUserByIdGqlService: GetUserByIdGqlService
  ) {}

  messages: ChatMessage[] = [];
  currentUser: UserAccount;
  loggedUser: UserAccount;

  chatForm = this.fb.group({
    input: ['', Validators.required],
  });

  ngOnInit(): void {
    const recipientId = this.route.snapshot.params.recipientId;
    const senderId = this.authService.getLoggedInUserId();

    if (recipientId == senderId) {
      this.router.navigate(['/']);
    }

    this.getUserByIdGqlService.get(recipientId).subscribe((user) => {
      this.currentUser = user;
    });

    this.getUserByIdGqlService
      .get(senderId)
      .subscribe((user) => (this.loggedUser = user));

    this.apollo
      .query({
        query: GET_CHATS,
        variables: {
          senderId: senderId,
          recipientId: recipientId,
        },
      })
      .subscribe((res) => (this.messages = (<any>res.data).chats));

    this.apollo
      .subscribe({
        query: GET_LATEST_CHAT,
        variables: {
          senderId: senderId,
          recipientId: recipientId,
        },
      })
      .subscribe((res) => {
        this.messages = [...this.messages, (<any>res.data).latestChat];
      });
  }

  sendChat(): void {
    if (this.chatForm.status === 'INVALID') {
      alert('You must fill something');
    } else {
      this.apollo
        .mutate({
          mutation: SEND_CHAT,
          variables: {
            senderId: this.loggedUser.id,
            recipientId: this.currentUser.id,
            message: this.chatForm.get('input').value,
          },
        })
        .pipe(map((res) => (<any>res.data).addChatMessage))
        .subscribe((isSuccess) => {
          if (isSuccess) {
            this.chatForm.reset();
          } else {
            alert('Failed when send chat');
          }
        });
    }
  }
}
