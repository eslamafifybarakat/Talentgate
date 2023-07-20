import { AlertsService } from './../../../core/services/alerts/alerts.service';
import { PublicService } from './../../../shared/services/public.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { keys } from 'src/app/shared/configs/localstorage-key';
import { HomeService } from './../../services/home.service';
import { FormBuilder } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { ApplyJobStepperComponent } from './components/apply-job-stepper/apply-job-stepper.component';

@Component({
  selector: 'app-apply-job',
  templateUrl: './apply-job.component.html',
  styleUrls: ['./apply-job.component.scss']
})
export class ApplyJobComponent implements OnInit {
  userData: any;
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
  links: any = [
    { id: 1, name: 'Most relevant', dropdown: [{ id: 0, name: 'most_recent' }, { id: 1, name: 'most_relevant' }], value: 'mostRelevant' },
    { id: 2, name: 'Experience level', dropdown: [{ id: 0, name: 'Intern ' }, { id: 1, name: 'Entry_level' }, { id: 2, name: 'Junior ' }, { id: 3, name: 'Intermediate' }, { id: 4, name: 'Mid-level' }, { id: 5, name: 'Senior ' }, { id: 6, name: 'Manage' }], value: 'experienceLevel' },
    { id: 3, name: 'Job type', dropdown: [{ id: 0, name: 'Full time' }, { id: 1, name: 'part_time' }, { id: 2, name: 'other' }], value: 'jobType' },
    { id: 4, name: 'Onsite/remote', dropdown: [{ id: 0, name: 'on-site' }, { id: 1, name: 'remote' }], value: 'onSite' },
    { id: 5, name: 'Title', dropdown: [], value: 'title' },
  ];
  companyName: any;

  form = this.fb?.group({
    mostRelevant: [null, []],
    experienceLevel: [null, []],
    experienceLevels: [null, []],
    jobType: [null, []],
    jobFunction: [null, []],
    onSite: [null, []],
    location: [null, []],
    industry: [null, []],
    title: [null, []]
  })
  get formControls(): any {
    return this.form?.controls;
  }
  constructor(
    private alertsService: AlertsService,
    private publicService: PublicService,
    private dialogService: DialogService,
    private homeService: HomeService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.searchResults = [];
    this.getJobRecommended(0);
    this.jobId = this.recommendedResults[0]?._id;
    this.companyName = this.recommendedResults[0]?.company?.name_company;
    this.publicService?.recallSearchResults?.subscribe((res: any) => {
      if (res?.recall == true) {
        this.getSearchResults(res?.searchValue);
      }
    });

    this.publicService?.recallLocationSearchResults?.subscribe((res: any) => {
      if (res?.recall == true) {
        this.getSearchLocationResults(this.jobId, res?.searchValue);
      }
    });
    this.userData = JSON?.parse(window?.localStorage?.getItem(keys?.userLoginData) || "{}");
    console.log(this.userData);
  }
  getJobRecommended(count: any): any {
    this.isLoadingRecommendedResults = true;
    this.homeService?.getJobRecommended(count)?.subscribe(
      (res: any) => {
        if (res?.status == 200) {
          // let arr: any = [];
          // res?.data ? res?.data?.job_offers?.forEach((item: any) => {
          //   arr?.push({
          //     _id: item?._id,
          //     title: item?.title ? item?.title : '',
          //     address: item?.address ? item?.address : '',
          //     name: item?.name ? item?.name : '',
          //     rate: item?.rate ? item?.rate : 0,
          //     time: item?.time ? item?.time : ''
          //   })
          // }) : '';
          this.recommendedResults = res.data.job_offers;
          console.log(this.recommendedResults)
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
  filterRecommendedData(event: any) {
    const selectedValue = event.value.name;
    console.log(event);
    this.recommendedResults = this.recommendedResults.filter((item: any) => item.value === selectedValue);
  }
  getJobOffersDetails(id: any): any {
    this.isLoadingDetails = true;
    this.homeService?.getJobOffersDetails(id)?.subscribe(
      (res: any) => {
        console.log(res)
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
        this.companyName = item?.company?.name_company;
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
  getSearchResults(value: any): any {
    this.isLoadingSearchResults = true;
    this.homeService?.getSearchResults(value)?.subscribe(
      (res: any) => {
        if (res?.status == 200) {
          let arr: any = [];
          arr = res?.data?.search_result ? res?.data?.search_result : [];
          // res?.data ? res?.data?.search_result?.forEach((item: any) => {
          //   arr?.push({
          //     coupon_name: item?.coupon_name ? item?.coupon_name : '',
          //     coupon_picture: item?.coupon_picture ? item?.coupon_picture : '',
          //     description: item?.description ? item?.description : '',
          //   })
          // }) : '';
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
  getSearchLocationResults(id?: any, value?: any): any {
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
  applyForJob(): any {
    const ref = this.dialogService.open(ApplyJobStepperComponent, {
      header: this.publicService?.translateTextFromJson('general.applyTo') + ' ' + this.companyName,
      data: { companyName: this.companyName, id: this.jobId },
      width: '55%',
      styleClass: 'apply-job-dialog',
    });

    ref.onClose.subscribe((res: any) => {
      if (res) {

      }
    });
    // this.publicService?.show_loader?.next(true);
    let data: any;
    data = {
      job_offer: "string",
      candidate_information: {
        user_name: this.userData?.full_name,
        email: this.userData?.email,
        phone_number: "string",
        country_code: this.userData?.country_code,
        country: this.userData?.country?._id,
        city: this.userData?.city?._id
      },
      cv: this.userData?.cv?.name_cv,
      cover_letter: "string",
      message: "string",
      questions_responses: [
        {
          _id: "string",
          response: "string"
        }
      ]
    }
    // this.homeService?.applyForJob(data)?.subscribe(
    //   (res: any) => {
    //     if (res?.status == 200) {
    //       this.publicService?.show_loader?.next(false);
    //     } else {
    //       res?.message ? this.alertsService?.openSweetAlert('info', res?.message) : '';
    //       this.publicService?.show_loader?.next(false);
    //     }
    //   },
    //   (err: any) => {
    //     err?.message ? this.alertsService?.openSweetAlert('error', err?.message) : '';
    //     this.publicService?.show_loader?.next(false);
    //   });
    this.cdr?.detectChanges();
  }
}
