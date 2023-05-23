import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-apply-job',
  templateUrl: './apply-job.component.html',
  styleUrls: ['./apply-job.component.scss']
})
export class ApplyJobComponent implements OnInit {
  searchResults: any = [];
  recommendedResults: any = [
    { id: 1, image: '../../../../assets/images/home/product.jfif', title: 'Product Designer', name: 'Google', rate: 3, address: 'Tunis,Tunisia', time: new Date() },
    { id: 2, image: '../../../../assets/images/home/product.jfif', title: 'Product Designer', name: 'Google', rate: 3, address: 'Tunis,Tunisia', time: new Date() },
    { id: 3, image: '../../../../assets/images/home/product.jfif', title: 'Product Designer', name: 'Google', rate: 3, address: 'Tunis,Tunisia', time: new Date() },
    { id: 4, image: '../../../../assets/images/home/product.jfif', title: 'Product Designer', name: 'Google', rate: 3, address: 'Tunis,Tunisia', time: new Date() },
    { id: 5, image: '../../../../assets/images/home/product.jfif', title: 'Product Designer', name: 'Google', rate: 3, address: 'Tunis,Tunisia', time: new Date() },
    { id: 6, image: '../../../../assets/images/home/product.jfif', title: 'Product Designer', name: 'Google', rate: 3, address: 'Tunis,Tunisia', time: new Date() },
  ];
  rating3: any = 3;
  skills: any = [{ title: 'User interface Design' }, { title: 'User interface Design Experience' }, { title: '88' }]
  constructor() { }

  ngOnInit(): void {
  }

}
