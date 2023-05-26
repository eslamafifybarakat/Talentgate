import { PublicService } from './../../../shared/services/public.service';
import { AlertsService } from './../../../core/services/alerts/alerts.service';
import { HomeService } from './../../services/home.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-apply-job',
  templateUrl: './apply-job.component.html',
  styleUrls: ['./apply-job.component.scss']
})
export class ApplyJobComponent implements OnInit {
  searchResults: any = [];
  isLoadingSearchResults: boolean = false;

  recommendedResults: any = [];
  isLoadingRecommendedResults: boolean = false;
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
  isLoadingDetails: boolean = false;
  jobId: any;
  rating3: any = 3;
  skills: any = [{ title: 'User interface Design' }, { title: 'User Experience' }, { title: '88' }];
  links: any = [
    { id: 1, name: 'Most relevant', dropdown: [{ id: 1, name: 'Most relevant1' }, { id: 2, name: 'Most relevant2' }, { id: 3, name: 'Most relevant3' }, { id: 4, name: 'Most relevant4' }] },
    { id: 2, name: 'Experience level', dropdown: [{ id: 1, name: 'Most relevant1' }, { id: 2, name: 'Most relevant2' }, { id: 3, name: 'Most relevant3' }, { id: 4, name: 'Most relevant4' }] },
    { id: 3, name: 'Experience levels', dropdown: [{ id: 1, name: 'Most relevant1' }, { id: 2, name: 'Most relevant2' }, { id: 3, name: 'Most relevant3' }, { id: 4, name: 'Most relevant4' }] },
    { id: 4, name: 'Job type', dropdown: [{ id: 1, name: 'Most relevant1' }, { id: 2, name: 'Most relevant2' }, { id: 3, name: 'Most relevant3' }, { id: 4, name: 'Most relevant4' }] },
    { id: 5, name: 'Onsite/remote', dropdown: [{ id: 1, name: 'Most relevant1' }, { id: 2, name: 'Most relevant2' }, { id: 3, name: 'Most relevant3' }, { id: 4, name: 'Most relevant4' }] },
    { id: 6, name: 'Location', dropdown: [{ id: 1, name: 'Most relevant1' }, { id: 2, name: 'Most relevant2' }, { id: 3, name: 'Most relevant3' }, { id: 4, name: 'Most relevant4' }] },
    { id: 7, name: 'Industry', dropdown: [{ id: 1, name: 'Most relevant1' }, { id: 2, name: 'Most relevant2' }, { id: 3, name: 'Most relevant3' }, { id: 4, name: 'Most relevant4' }] },
    { id: 8, name: 'Job Function', dropdown: [{ id: 1, name: 'Most relevant1' }, { id: 2, name: 'Most relevant2' }, { id: 3, name: 'Most relevant3' }, { id: 4, name: 'Most relevant4' }] },
    { id: 9, name: 'Title', dropdown: [] },
  ]
  constructor(
    private alertsService: AlertsService,
    private publicService: PublicService,
    private homeService: HomeService,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.getJobRecommended(0);
    this.changeData(this.recommendedResults[0]?._id);
    this.jobId = this.recommendedResults[0]?._id;
    this.publicService?.recallSearchResults?.subscribe((res: any) => {
      if (res?.recall == true) {
        this.getSearchResults(this.jobId, res?.searchValue);
      }
    });
  }
  getJobRecommended(count: any): any {
    this.isLoadingRecommendedResults = true;
    this.homeService?.getJobRecommended(count)?.subscribe(
      (res: any) => {
        if (res?.status == 200) {
          res?.data ? this.recommendedResults = res?.data?.job_offers : [];
          this.recommendedResults['isActive'] = false;
          this.isLoadingRecommendedResults = false;
          this.changeData(this.recommendedResults[0]?._id);
        } else {
          res?.message ? this.alertsService?.openSweetAlert('info', res?.message) : '';
          this.isLoadingRecommendedResults = false;
        }
      },
      (err: any) => {
        err?.message ? this.alertsService?.openSweetAlert('error', err?.message) : '';
        this.isLoadingRecommendedResults = false;
      });
    this.cdr?.detectChanges();
  }
  getJobOffersDetails(id: any): any {
    this.isLoadingDetails = true;
    this.homeService?.getJobOffersDetails(id)?.subscribe(
      (res: any) => {
        if (res?.status == 200) {
          res?.data ? this.jobDetails = res?.data : '';
          this.isLoadingDetails = false;
        } else {
          res?.message ? this.alertsService?.openSweetAlert('info', res?.message) : '';
          this.isLoadingDetails = false;
        }
      },
      (err: any) => {
        err?.message ? this.alertsService?.openSweetAlert('error', err?.message) : '';
        this.isLoadingDetails = false;
      });
    this.cdr?.detectChanges();
  }
  changeData(id: any): void {
    this.recommendedResults?.forEach((item: any) => {
      if (item?._id == id) {
        item.isActive = true;
      } else {
        item.isActive = false;
      }
    });
    this.getJobOffersDetails(id);
    this.jobId = id;
    // this.jobDetails = {
    //   id: 1,
    //   title: 'Product Designer 2', address: 'tunisia,tunisia', timeAgo: '5hours', applicationsNumber: 200, time: 'Part-time', position: 'Mid-Senior level', skills: [{ title: 'User interface Design' }, { title: 'User Experience' }], jobDescription: `<div>
    //   <p class="mb-1 fw-600">Eligiblity</p>
    //   <p>5-3 Year of experience</p>
    // </div>
    // <div>
    //   <p class="mb-1 fw-600">Missions</p>
    //   <p>- Lorem ipsum dolor sit amet</p>
    //   <p>- consectetur adipisicing elit.</p>
    //   <p>- Excepturi amet odio ex error libero, dicta nam, corporis inventore, qui ipsa sit. Velit
    //     veritatis reiciendis facere, suscipit id beatae tenetur sint?</p>
    //   <p>- ex error libero, dicta nam, corporis inventore, qui ipsa sit. Velit
    //     veritatis reiciendis facere, suscipit id beatae tenetur sint?</p>
    //   <p>- Excepturi amet odio ex error libero, dicta nam, corporis inventor suscipit id beatae
    //     tenetur sint?</p>
    // </div>
    // <div>
    //   <p class="mb-1 fw-600">Profile type</p>
    //   <p>- Lorem ipsum dolor sit amet</p>
    //   <p>- consectetur adipisicing elit.</p>
    //   <p>- Excepturi amet odio ex error libero, dicta nam, corporis inventore, qui ipsa sit. Velit
    //     veritatis reiciendis facere, suscipit id beatae tenetur sint?</p>
    //   <p>- ex error libero, dicta nam, corporis inventore, qui ipsa sit. Velit
    //     veritatis reiciendis facere, suscipit id beatae tenetur sint?</p>
    //   <p>- Excepturi amet odio ex error libero, dicta nam, corporis inventor suscipit id beatae
    //     tenetur sint?</p>
    // </div>`
    // };
  }
  getSearchResults(id?: any, value?: any): any {
    this.isLoadingSearchResults = true;
    this.homeService?.getJobOfferSearchResults(id, value)?.subscribe(
      (res: any) => {
        if (res?.status == 200) {
          let arr: any = [];
          res?.data ? res?.data?.offers?.forEach((item: any) => {
            arr?.push({
              coupon_name: item?.coupon_name ? item?.coupon_name : '',
              coupon_picture: item?.coupon_picture ? item?.coupon_picture : '',
              description: item?.description ? item?.description : '',
            })
          }) : '';
          this.searchResults = arr;
          this.isLoadingSearchResults = false;
        } else {
          res?.message ? this.alertsService?.openSweetAlert('info', res?.message) : '';
          this.isLoadingSearchResults = false;
        }
      },
      (err: any) => {
        err?.message ? this.alertsService?.openSweetAlert('error', err?.message) : '';
        this.isLoadingSearchResults = false;
      });
    this.cdr?.detectChanges();
  }
}
