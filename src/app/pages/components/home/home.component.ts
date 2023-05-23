import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchResults: any = [];
  allRecommendedResults: any = [4, 5, 55, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 222, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2
    // { id: 1, image: '', title: '', name: '', rate: 0, address: '', time: '' }
  ];
  recommendedResults: any = [2, 5, 5, 4, 9, 8];
  rating3: any = 3;
  count: any;
  constructor() { }

  ngOnInit(): void {
    this.count = this.recommendedResults?.length
  }
  seeMore(): void {
    this.count += 6;
    this.allRecommendedResults?.forEach((item: any, index: any) => {
      if (index > this.recommendedResults?.length && index <= this.count) {
        this.recommendedResults?.push(item);
      }
    });
  }
}
