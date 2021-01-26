import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getGameImageUrl } from 'src/app/globals';

@Component({
  selector: 'app-warning-mature-content',
  templateUrl: './warning-mature-content.component.html',
  styleUrls: ['./warning-mature-content.component.scss'],
})
export class WarningMatureContentComponent implements OnInit {
  gameId: number = -1;
  headerImgUrl: string = '';
  date: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.gameId = parseInt(this.route.snapshot.paramMap.get('id'));
    this.headerImgUrl = getGameImageUrl(this.gameId, 'header.jpg');
  }

  onViewPage(): void {
    if (this.date == '') {
      alert('Please input the date');
      return;
    }

    console.log(this.date);
    const dateStr = this.date;
    const userDOB = new Date(Date.parse(dateStr));
    const currentDate = new Date();
    const userAge = currentDate.getFullYear() - userDOB.getFullYear();

    if (userAge < 17) {
      alert("Oops. you can't access this game");
      this.router.navigate(['/']);
    } else {
      this.date = '';
      const nextRoute: string = `/game/${this.gameId}`;
      this.router.navigate([nextRoute], { queryParams: { checked: 'true' } });
    }
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }
}
