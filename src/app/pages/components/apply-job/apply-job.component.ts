import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-apply-job',
  templateUrl: './apply-job.component.html',
  styleUrls: ['./apply-job.component.scss']
})
export class ApplyJobComponent implements OnInit {
  searchResults: any = [];
  recommendedResults: any = [
    { id: 1, image: '../../../../assets/images/home/product.jfif', title: 'Product Designer', name: 'Google', rate: 3, address: 'Tunis,Tunisia', time: new Date(), isActive: true },
    { id: 2, image: '../../../../assets/images/home/product.jfif', title: 'Product Designer', name: 'Google', rate: 3, address: 'Tunis,Tunisia', time: new Date(), isActive: false },
    { id: 3, image: '../../../../assets/images/home/product.jfif', title: 'Product Designer', name: 'Google', rate: 3, address: 'Tunis,Tunisia', time: new Date(), isActive: false },
    { id: 4, image: '../../../../assets/images/home/product.jfif', title: 'Product Designer', name: 'Google', rate: 5, address: 'Tunis,Tunisia', time: new Date(), isActive: false },
    { id: 5, image: '../../../../assets/images/home/product.jfif', title: 'Product Designer', name: 'Google', rate: 4, address: 'Tunis,Tunisia', time: new Date(), isActive: false },
    { id: 6, image: '../../../../assets/images/home/product.jfif', title: 'Product Designer', name: 'Google', rate: 3, address: 'Tunis,Tunisia', time: new Date(), isActive: false },
  ];
  jobDetails: any = {
    id: 1,
    title: 'Product Designer', address: 'Sousse,tunisia', timeAgo: '5hours', applicationsNumber: 200, time: 'Full-time', position: 'Mid-Senior level', skills: [{ title: 'User interface Design' }, { title: 'User interface Design Experience' }, { title: '88' }], jobDescription: `<div>
    <p class="mb-1 fw-600">Eligiblity</p>
    <p>5-3 Year of experience</p>
  </div>
  <div>
    <p class="mb-1 fw-600">Missions</p>
    <p>- Lorem ipsum dolor sit amet</p>
    <p>- consectetur adipisicing elit.</p>
    <p>- Excepturi amet odio ex error libero, dicta nam, corporis inventore, qui ipsa sit. Velit
      veritatis reiciendis facere, suscipit id beatae tenetur sint?</p>
    <p>- ex error libero, dicta nam, corporis inventore, qui ipsa sit. Velit
      veritatis reiciendis facere, suscipit id beatae tenetur sint?</p>
    <p>- Excepturi amet odio ex error libero, dicta nam, corporis inventor suscipit id beatae
      tenetur sint?</p>
  </div>
  <div>
    <p class="mb-1 fw-600">Profile type</p>
    <p>- Lorem ipsum dolor sit amet</p>
    <p>- consectetur adipisicing elit.</p>
    <p>- Excepturi amet odio ex error libero, dicta nam, corporis inventore, qui ipsa sit. Velit
      veritatis reiciendis facere, suscipit id beatae tenetur sint?</p>
    <p>- ex error libero, dicta nam, corporis inventore, qui ipsa sit. Velit
      veritatis reiciendis facere, suscipit id beatae tenetur sint?</p>
    <p>- Excepturi amet odio ex error libero, dicta nam, corporis inventor suscipit id beatae
      tenetur sint?</p>
  </div>`
  };
  rating3: any = 3;
  skills: any = [{ title: 'User interface Design' }, { title: 'User Experience' }, { title: '88' }]
  constructor() { }

  ngOnInit(): void {
  }

  changeData(id: any): void {
    this.recommendedResults?.forEach((item: any) => {
      if (item?.id == id) {
        item.isActive = true;
      } else {
        item.isActive = false;
      }
    });
    this.jobDetails = {
      id: 1,
      title: 'Product Designer 2', address: 'tunisia,tunisia', timeAgo: '5hours', applicationsNumber: 200, time: 'Part-time', position: 'Mid-Senior level', skills: [{ title: 'User interface Design' }, { title: 'User Experience' }], jobDescription: `<div>
      <p class="mb-1 fw-600">Eligiblity</p>
      <p>5-3 Year of experience</p>
    </div>
    <div>
      <p class="mb-1 fw-600">Missions</p>
      <p>- Lorem ipsum dolor sit amet</p>
      <p>- consectetur adipisicing elit.</p>
      <p>- Excepturi amet odio ex error libero, dicta nam, corporis inventore, qui ipsa sit. Velit
        veritatis reiciendis facere, suscipit id beatae tenetur sint?</p>
      <p>- ex error libero, dicta nam, corporis inventore, qui ipsa sit. Velit
        veritatis reiciendis facere, suscipit id beatae tenetur sint?</p>
      <p>- Excepturi amet odio ex error libero, dicta nam, corporis inventor suscipit id beatae
        tenetur sint?</p>
    </div>
    <div>
      <p class="mb-1 fw-600">Profile type</p>
      <p>- Lorem ipsum dolor sit amet</p>
      <p>- consectetur adipisicing elit.</p>
      <p>- Excepturi amet odio ex error libero, dicta nam, corporis inventore, qui ipsa sit. Velit
        veritatis reiciendis facere, suscipit id beatae tenetur sint?</p>
      <p>- ex error libero, dicta nam, corporis inventore, qui ipsa sit. Velit
        veritatis reiciendis facere, suscipit id beatae tenetur sint?</p>
      <p>- Excepturi amet odio ex error libero, dicta nam, corporis inventor suscipit id beatae
        tenetur sint?</p>
    </div>`
    };
  }
}
