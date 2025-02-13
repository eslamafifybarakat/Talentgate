import { AlertsService } from 'src/app/core/services/alerts/alerts.service';
import { PublicService } from './../../../shared/services/public.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { keys } from './../../../shared/configs/localstorage-key';
import { HomeService } from '../../services/home.service';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchResults: any = [];
  isLoadingSearchResults: boolean = false;
  hiringAreas: any = [];
  isLoadingHiringAreas: boolean = false;

  recommendedResults: any = [];
  isLoadingRecommendedResults: boolean = false;
  rating3: any = 3;
  count: any = 6;
  userData: any;
  userProfileDetails: any;
  aboutText: any;
  aboutMe: any;
  constructor(
    private publicService: PublicService,
    private alertsService: AlertsService,
    private homeService: HomeService,
    private cdr: ChangeDetectorRef,
    private profileService: ProfileService,
  ) { }

  ngOnInit(): void {
    this.searchResults = [];
    this.userData = JSON.parse(window.localStorage.getItem(keys.userLoginData) || '{}');
    console.log(this.userData)
    this.count = this.recommendedResults?.length;
    this.publicService?.recallSearchResults?.subscribe((res: any) => {
      console.log(res)
      if (res?.recall == true) {
        this.getSearchResults(res?.searchValue);
      }
    });
    this.getHiring();
    this.getJobRecommended(0);
    this.getProfileDetails();
    this.getResume()
  }

  getProfileDetails() {
    this.homeService.getProfileDetails().subscribe((res) => {
      console.log(res)
      this.userProfileDetails = res.data.user;
      console.log(this.userProfileDetails);

    })
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
          console.log(this.searchResults)
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
  getHiring(): any {
    this.isLoadingHiringAreas = true;
    this.homeService?.getHiring(0)?.subscribe(
      (res: any) => {
        if (res?.status == 200) {
          this.hiringAreas = res?.data ? res?.data?.companies : [];
          console.log(this.hiringAreas)
          this.isLoadingHiringAreas = false;
        } else {
          res?.message ? this.alertsService?.openSweetAlert('info', res?.message) : '';
          this.isLoadingHiringAreas = false;
        }
      },
      (err: any) => {
        err?.message ? this.alertsService?.openSweetAlert('error', err?.message) : '';
        this.isLoadingHiringAreas = false;
      });
    this.cdr?.detectChanges();

    // this.hiringAreas = [
    //   { image_company: '../../../../assets/images/home/Microsoft.png', name_company: 'Microsoft', address_company: 'Tunis,Tunisia' },
    //   { image_company: '../../../../assets/images/home/Microsoft.png', name_company: 'Microsoft', address_company: 'Tunis,Tunisia' },
    //   { image_company: '../../../../assets/images/home/Microsoft.png', name_company: 'Microsoft', address_company: 'Tunis,Tunisia' }
    // ]
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
          //     title: item?.title ? item?.title : 'dummy',
          //     address: item?.address ? item?.address : 'dummy',
          //     name: item?.name ? item?.name : 'dummy',
          //     rate: item?.rate ? item?.rate : 0,
          //     time: item?.time ? item?.time : 'dummy'
          //   })
          // }) : '';
          this.recommendedResults = res.data.job_offers;
          console.log(this.recommendedResults)
          this.isLoadingRecommendedResults = false;
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

    // this.recommendedResults = [
    //   {
    //     _id: 'jkdjd9892',
    //     title: 'Product Designer',
    //     address: 'Sousse,tunisia',
    //     name: 'Google',
    //     rate: 4,
    //     time: 'Posted 5hours ago'
    //   },
    //   {
    //     _id: 'jkdjd9892',
    //     title: 'Product Designer',
    //     address: 'Sousse,tunisia',
    //     name: 'Google',
    //     rate: 4,
    //     time: 'Posted 5hours ago'
    //   },
    //   {
    //     _id: 'jkdjd9892',
    //     title: 'Product Designer',
    //     address: 'Sousse,tunisia',
    //     name: 'Google',
    //     rate: 4,
    //     time: 'Posted 5hours ago'
    //   },
    //   {
    //     _id: 'jkdjd9892',
    //     title: 'Product Designer',
    //     address: 'Sousse,tunisia',
    //     name: 'Google',
    //     rate: 4,
    //     time: 'Posted 5hours ago'
    //   },
    //   {
    //     _id: 'jkdjd9892',
    //     title: 'Product Designer',
    //     address: 'Sousse,tunisia',
    //     name: 'Google',
    //     rate: 4,
    //     time: 'Posted 5hours ago'
    //   },
    //   {
    //     _id: 'jkdjd9892',
    //     title: 'Product Designer',
    //     address: 'Sousse,tunisia',
    //     name: 'Google',
    //     rate: 4,
    //     time: 'Posted 5hours ago'
    //   },
    //   {
    //     _id: 'jkdjd9892',
    //     title: 'Product Designer',
    //     address: 'Sousse,tunisia',
    //     name: 'Google',
    //     rate: 4,
    //     time: 'Posted 5hours ago'
    //   }
    // ];
  }
  calculateHoursDifference(presentationDate: string): number {
    const date1 = new Date(presentationDate);
    const date2 = new Date(); // الوقت الحالي
    const timeDifference = date2.getTime() - date1.getTime();
    const hoursDifference = timeDifference / (1000 * 3600); // تحويل الوقت من مللي ثانية إلى ساعات
    return Math.floor(hoursDifference); // تقريب إلى الأقل
  }
  getResume() {
    this.profileService?.getResume()?.subscribe(
      (res: any) => {
        if (res?.status == 200) {
          this.aboutText = res?.data[0]?.about_me;
          this.aboutMe = this.aboutText;
          console.log(this.aboutMe)
        } else {
          res?.message ? this.alertsService?.openSweetAlert('info', res?.message) : '';
        }
      },
      (err: any) => {
        err?.message ? this.alertsService?.openSweetAlert('error', err?.message) : '';
      });
  }
  seeMore(): void {
    this.count += 6;
    this.getJobRecommended(this.count);
    // this.allRecommendedResults?.forEach((item: any, index: any) => {
    //   if (index > this.recommendedResults?.length && index <= this.count) {
    //     this.recommendedResults?.push(item);
    //   }
    // });
  }
}
