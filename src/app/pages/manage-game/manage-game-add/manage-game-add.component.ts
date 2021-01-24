import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { convertFileToBase64 } from 'src/app/globals';
import { Developer } from 'src/app/models/developer';
import { Genre } from 'src/app/models/genre';
import { Publisher } from 'src/app/models/publisher';
import { Tag } from 'src/app/models/tag';

const GET_TAGS_AND_GENRES = gql`
  query GetTagAndGenre{
    tags{
      id,
      name
    }
    
    genres{
      id,
      name
    }

    publishers{
      id,
      name
    }
    
    developers{
      id,
      name
    }
  }
`;

const ADD_GAME = gql`
  mutation createNewGame($newGame:NewGame) {
    createGame(newGame:$newGame){
      id,
      images{
        url
      },
      tags{
        id,
        name
      },
      genres{
        id,
        name
      }
    }
  }
`;

@Component({
  selector: 'app-manage-game-add',
  templateUrl: './manage-game-add.component.html',
  styleUrls: ['./manage-game-add.component.scss']
})
export class ManageGameAddComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private apollo: Apollo,
    private router: Router
  ) { }

  tagCb = this.fb.array([]);
  genreCb = this.fb.array([]);

  addGameForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    price: ['', Validators.required],
    releaseDate: ['', Validators.required],
    developer: ['1', Validators.required],
    publisher: ['1', Validators.required],
    headerImg: ['', Validators.required],
    gameImgs: ['', Validators.required],
    tagsFg: this.tagCb,
    genresFg: this.genreCb,
  })

  tags: Tag[] = [];
  genres: Genre[] = [];
  publishers: Publisher[] = [];
  developers: Developer[] = [];
  gameImgs: string[] = [];
  gameHeaderImg: string;
  errorMsg: string = '';

  ngOnInit(): void {
    this.apollo.watchQuery({
      query: GET_TAGS_AND_GENRES,
    })
    .valueChanges
    .subscribe(res => {
      this.tags = (<any>res.data).tags;
      this.genres = (<any>res.data).genres;
      this.publishers = (<any>res.data).publishers;
      this.developers = (<any>res.data).developers;

      this.genres.forEach(() => this.genreCb.push(new FormControl(false)));
      this.tags.forEach(() => this.tagCb.push(new FormControl(false)));
      console.log(this.addGameForm.get('tagsFg'))
    })
  }

  async setGameHeader(e: Event): Promise<any> {
    const headerImgFile: FileList = (<any>e.target).files[0];
    convertFileToBase64(headerImgFile).then(resolve => {
      this.gameHeaderImg = resolve;
      console.log("masyokkkk");
    });
  }

  async setGameImgs(e: Event): Promise<any> {
    const tempFile: FileList[] = (<any>e.target).files;
    const fileCount = tempFile.length;
    for (let i=0; i<fileCount; i++) {
      const converted: string = await convertFileToBase64(tempFile[i]);
      this.gameImgs.push(converted);
    }
  }

  onSubmit():void {
    if(this.addGameForm.status === "INVALID") {
      this.errorMsg = 'All field must be filled'
    }else {
      if (!this.addGameForm.get('tagsFg').value.includes(true)) {
        this.errorMsg = 'Choose tag min. 1';
      } else if (!this.addGameForm.get('genresFg').value.includes(true)) {
        this.errorMsg = 'Choose genres min 1'
      } else {
        this.addGame();
      }
    }
  }

  addGame(): void {
    this.errorMsg = '';
    const genreIds: number[] = []
    this.addGameForm.get('genresFg').value.forEach((val, idx) => {
      if (val === true) genreIds.push(idx+1);
    });

    const tagIds: number[] = [];
    this.addGameForm.get('tagsFg').value.forEach((val, idx) => {
      if (val === true) tagIds.push(idx+1);
    });

    this.apollo.mutate({
      mutation: ADD_GAME,
      variables: {
        "newGame": {
          "title": this.addGameForm.get('title').value,
          "developerId": parseInt(this.addGameForm.get('developer').value),
          "releaseDate": this.addGameForm.get('releaseDate').value,
          "tagIds": tagIds,
          "description": this.addGameForm.get('description').value,
          "genreIds": genreIds,
          "publisherId": parseInt(this.addGameForm.get('publisher').value),
          "price": parseInt(this.addGameForm.get('price').value),
          "gameHeaderImage": this.gameHeaderImg,
          "gameImages": this.gameImgs,
        }
      }
    })
    .pipe(map(res => (<any>res.data).createGame))
    .subscribe(game => {
      if(game) {
        alert("Add New Game Success!");
        this.gameImgs = [];
        this.addGameForm.reset();
        this.router.navigate(['/admin/manage-game']);
        window.location.reload();
      }else {
        alert("Oops. Failed when adding new game.")
      }
    });
  }

}
