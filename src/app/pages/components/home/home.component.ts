import { AlertsService } from 'src/app/core/services/alerts/alerts.service';
import { PublicService } from './../../../shared/services/public.service';
import { keys } from './../../../shared/configs/localstorage-key';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchResults: any = [];
  isLoadingSearchResults: boolean = false;
  hiringAreas: any = [8, 9, 8];
  isLoadingHiringAreas: boolean = false;

  allRecommendedResults: any = [4, 5, 55, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 222, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2
    // { id: 1, image: '', title: '', name: '', rate: 0, address: '', time: '' }
  ];
  recommendedResults: any = [2, 5, 5, 4, 9, 8];
  isLoadingRecommendedResults: boolean = false;
  rating3: any = 3;
  count: any;
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
    // this.getHiring();
    // this.getJobRecommended();
  }
  getSearchResults(value: any): any {
    this.isLoadingSearchResults = true;
    this.homeService?.getSearchResults(value)?.subscribe(
      (res: any) => {
        if (res?.status == 200) {
          let arr: any = [];
          res?.data ? res?.data?.coupons?.forEach((item: any) => {
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
    this.homeService?.getHiring(10000)?.subscribe(
      (res: any) => {
        if (res?.status == 200) {
          let arr: any = [];
          res?.data ? res?.data?.coupons?.forEach((item: any) => {
            arr?.push({
              coupon_name: item?.coupon_name ? item?.coupon_name : '',
              coupon_picture: item?.coupon_picture ? item?.coupon_picture : '',
              description: item?.description ? item?.description : '',
            })
          }) : '';
          this.hiringAreas = arr;
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
  getJobRecommended(): any {
    this.isLoadingRecommendedResults = true;
    this.homeService?.getJobRecommended(10000)?.subscribe(
      (res: any) => {
        if (res?.status == 200) {
          let arr: any = [];
          res?.data ? res?.data?.coupons?.forEach((item: any) => {
            arr?.push({
              coupon_name: item?.coupon_name ? item?.coupon_name : '',
              coupon_picture: item?.coupon_picture ? item?.coupon_picture : '',
              description: item?.description ? item?.description : '',
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
  seeMore(): void {
    this.count += 6;
    this.allRecommendedResults?.forEach((item: any, index: any) => {
      if (index > this.recommendedResults?.length && index <= this.count) {
        this.recommendedResults?.push(item);
      }
    });
  }
}
