import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Genre } from 'src/app/models/genre';
import { GetTagsAndGenresGqlService } from 'src/app/services/gql/query/get-tags-and-genres-gql.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  genres: Genre[] = [];

  links = [
    {
      name : 'Discovery Queues',
      contents: [
        { title: 'Recommendations'},
        { title: 'New Release'},
      ],
    },
    {
      name : 'Browse Categories',
      contents: [
        { title: 'Top Sellers', href: '/search/by-category=top-sellers'},
        { title: 'New Releases', href: '/search/by-category=new-releases'},
        { title: 'Upcoming', href: '/search/by-category=upcoming'},
        { title: 'Specials', href: '/search/by-category=specials'},
      ],
    },
    {
      name : 'Browse by Genre',
      contents: [],
    },
  ]

  constructor(
    private getTagsAndGenresGqlService: GetTagsAndGenresGqlService
  ) { }

  ngOnInit(): void {
   this.getTagsAndGenresGqlService.watch()
    .valueChanges
    .subscribe(res => {
      res.data.genres.forEach(genre => {
        this.links[2].contents.push({
          title: genre.name,
          href: '/search/?term=&bygenre=' + genre.id
        })
      });
    })
  }

}
