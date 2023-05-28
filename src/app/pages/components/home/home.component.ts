import { AlertsService } from 'src/app/core/services/alerts/alerts.service';
import { PublicService } from './../../../shared/services/public.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { keys } from './../../../shared/configs/localstorage-key';
import { HomeService } from '../../services/home.service';

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
  constructor(
    private publicService: PublicService,
    private alertsService: AlertsService,
    private homeService: HomeService,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.userData = JSON.parse(window.localStorage.getItem(keys.userLoginData) || '{}');
    this.count = this.recommendedResults?.length;
    this.publicService?.recallSearchResults?.subscribe((res: any) => {
      if (res?.recall == true) {
        this.getSearchResults(res?.searchValue);
      }
    });
    this.getHiring();
    this.getJobRecommended(0);

  }
  getSearchResults(value: any): any {
    this.isLoadingSearchResults = true;
    this.homeService?.getSearchResults(value)?.subscribe(
      (res: any) => {
        if (res?.status == 200) {
          let arr: any = [];
          res?.data ? res?.data?.search_result?.forEach((item: any) => {
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

    this.searchResults = [
      { coupon_name: 'User Experience(Ux) Designer' },
      { coupon_name: 'User Experience(Ux) Designer' },
      { coupon_name: 'User Experience(Ux) Designer' },
      { coupon_name: 'User Experience(Ux) Designer' },
      { coupon_name: 'User Experience(Ux) Designer' },
      { coupon_name: 'User Experience(Ux) Designer' },
      { coupon_name: 'User Experience(Ux) Designer' },
      { coupon_name: 'User Experience(Ux) Designer' },
    ]
  }
  getHiring(): any {
    this.isLoadingHiringAreas = true;
    this.homeService?.getHiring(0)?.subscribe(
      (res: any) => {
        if (res?.status == 200) {
          this.hiringAreas = res?.data ? res?.data?.companies : [];
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
  }
  getJobRecommended(count: any): any {
    this.isLoadingRecommendedResults = true;
    this.homeService?.getJobRecommended(count)?.subscribe(
      (res: any) => {
        if (res?.status == 200) {
          let arr: any = [];
          res?.data ? res?.data?.job_offers?.forEach((item: any) => {
            arr?.push({
              _id: item?._id,
              title: item?.title ? item?.title : 'dummy',
              address: item?.address ? item?.address : 'dummy',
              name: item?.name ? item?.name : 'dummy',
              rate: item?.rate ? item?.rate : 0,
              time: item?.time ? item?.time : 'dummy'
            })
          }) : '';
          this.recommendedResults = arr;
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
