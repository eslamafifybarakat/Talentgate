import { AlertsService } from './../../../core/services/alerts/alerts.service';
import { PublicService } from './../../../shared/services/public.service';
import { HomeService } from './../../services/home.service';

import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userData: any = {};
  rate: any = 4;
  recommendedResults: any = [];
  isLoadingRecommendedResults: boolean = false;

  searchResults: any = [];
  isLoadingSearchResults: boolean = false;

  isEditAbout: boolean = false;
  aboutText: any = 'UI refers to the screens, buttons, toggles, icons, and other visual elements that you interact with when using a website, app, or other electronic device.';
  aboutTextarea: any = 'UI refers to the screens, buttons, toggles, icons, and other visual elements that you interact with when using a website, app, or other electronic device.';

  imgProfileFileSrc: any = this.userData?.image;
  imgBgFileSrc: any = 'assets/images/home/bg.jfif';
  @ViewChild('profilePictureInput') profilePictureInput: any;

  constructor(
    private alertsService: AlertsService,
    private publicService: PublicService,
    private homeService: HomeService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getJobRecommended(0);
    this.publicService?.recallSearchResults?.subscribe((res: any) => {
      if (res?.recall == true) {
        this.getSearchResults(res?.searchValue);
      }
    });
    // this.getSearchResults('');
  }

  editAbout(): void {
    this.isEditAbout = true;
  }
  saveEditText(): void {
    this.aboutText = this.aboutTextarea;
    this.isEditAbout = false;
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
    this.recommendedResults = [
      {
        _id: 'jkdjd9892',
        title: 'Product Designer',
        address: 'Sousse,tunisia',
        name: 'Google',
        rate: 4,
        time: 'Posted 5hours ago'
      },
      {
        _id: 'jkdjd9892',
        title: 'Product Designer',
        address: 'Sousse,tunisia',
        name: 'Google',
        rate: 4,
        time: 'Posted 5hours ago'
      },
      {
        _id: 'jkdjd9892',
        title: 'Product Designer',
        address: 'Sousse,tunisia',
        name: 'Google',
        rate: 4,
        time: 'Posted 5hours ago'
      }
    ]
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

  selectImage(event: any): void {
    let fileReader = new FileReader();
    fileReader.readAsDataURL(event?.target?.files[0]);
    fileReader.onload = this._handleReaderLoadedImage.bind(this);
  }
  _handleReaderLoadedImage(e: any): void {
    var reader: any = null;
    reader = e.target;
    this.imgProfileFileSrc = reader.result;
    this.cdr?.detectChanges();
  }
  selectBgImage(event: any): void {
    let fileReader = new FileReader();
    fileReader.readAsDataURL(event?.target?.files[0]);
    fileReader.onload = this._handleReaderLoadedBgImage.bind(this);
  }
  _handleReaderLoadedBgImage(e: any): void {
    var reader: any = null;
    reader = e.target;
    this.imgBgFileSrc = reader.result;
    this.cdr?.detectChanges();
  }
  removeImage(): void {
    this.imgProfileFileSrc = '';

  }
}
