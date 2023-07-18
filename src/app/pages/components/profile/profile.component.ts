import { AddEditCertificationComponent } from './components/add-edit-certification/add-edit-certification.component';
import { AddEditSkillComponent } from './components/add-edit-skill/add-edit-skill.component';
import { AddEditExperienceComponent } from './components/add-edit-experience/add-edit-experience.component';
import { AddEditLanguageComponent } from './components/add-edit-language/add-edit-language.component';
import { AddEditEducationComponent } from './components/add-edit-education/add-edit-education.component';
import { EditProfileModalComponent } from './components/edit-profile-modal/edit-profile-modal.component';
import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { AlertsService } from './../../../core/services/alerts/alerts.service';
import { PublicService } from './../../../shared/services/public.service';
import { HomeService } from './../../services/home.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ProfileService } from '../../services/profile.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userData: any = {};
  imgSrc: string = 'https://dev-api.talentsgates.website/getimage/';
  rate: any;
  recommendedResults: any = [];
  isLoadingRecommendedResults: boolean = false;

  searchResults: any = [];
  userProfileDetails: any
  isLoadingSearchResults: boolean = false;

  isEditAbout: boolean = false;
  aboutText: any = 'UI refers to the screens, buttons, toggles, icons, and other visual elements that you interact with when using a website, app, or other electronic device.';
  // aboutTextarea: any = 'UI refers to the screens, buttons, toggles, icons, and other visual elements that you interact with when using a website, app, or other electronic device.';
  isLast: boolean = false
  imgProfileFileSrc: any = this.userData?.image;
  imgBgFileSrc: any = 'assets/images/home/bg.jfif';
  @ViewChild('profilePictureInput') profilePictureInput: any;


  experiences: any = [4, 6, 8];
  startDate: any;
  end_date: any;
  sx: any;
  totalYears: any;
  daysDiff: any;
  aboutMe: any;
  aboutMeId: any;

  isEditExperiences: boolean = false
  isEditLanguages: boolean = false
  isEditEducations: boolean = false
  isEditCertificates: boolean = false
  isEditSkills: boolean = false

  // @ViewChild('aboutTextArea', { static: false }) aboutTextArea!: ElementRef;
  constructor(
    private alertsService: AlertsService,
    private profileService: ProfileService,
    private publicService: PublicService,
    private dialogService: DialogService,
    private homeService: HomeService,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.getJobRecommended(0);
    this.publicService?.recallSearchResults?.subscribe((res: any) => {
      if (res?.recall == true) {
        this.getSearchResults(res?.searchValue);
      }
    });
    // this.getSearchResults('');

    this.getProfileDetails();
    this.getResume();
  }

  getProfileDetails() {
    this.homeService.getProfileDetails().subscribe((res) => {
      console.log(res)
      this.userProfileDetails = res.data.user;
    })
  }
  getYearsDiffernce(d1: Date, d2: Date) {
    let startDate = new Date(d1).getFullYear();
    let endDate = new Date(d2).getFullYear();
    const yearsDiff = endDate - startDate;
    this.totalYears = 0
    this.totalYears += yearsDiff;
    return yearsDiff;
  }
  getProficiencyText(num: number) {
    if (num == 0) {
      return 'No Proficiency'
    }
    else if (num == 1) {
      return 'Elementary Proficiency'
    }
    else if (num == 2) {
      return 'Limited Working Proficiency'
    }
    else if (num == 3) {
      return 'Professional Working Proficiency'
    }
    else if (num == 4) {
      return 'Full Professional Proficiency'
    }
    else if (num == 5) {
      return 'Native'
    }
    else {
      return 'No Proficiency'
    }
  }

  onRateChange(event: any) {
    console.log(event)
    this.rate = event
  }
  getResume() {
    this.homeService.getResume().subscribe((res) => {
      console.log(res);
      this.aboutMe = (res.data)[0].about_me;
      this.aboutMeId = (res.data)[0]._id
      console.log(this.aboutMe);
      // this.isEditAbout = true;
      // this.aboutTextArea.nativeElement.textContent = this.aboutMe;
    })
  }

  editAbout(): void {
    this.isEditAbout = true;
  }
  saveEditText(): void {
    this.profileService?.editResume(this.aboutMe)?.subscribe(
      (res: any) => {
        if (res?.status == 200) {
          this.isEditAbout = false;
        } else {
          res?.message ? this.alertsService?.openSweetAlert('info', res?.message) : '';
        }
      },
      (err: any) => {
        err?.message ? this.alertsService?.openSweetAlert('error', err?.message) : '';
      });
    this.cdr?.detectChanges();
    // this.aboutText = this.aboutTextarea;
    // this.homeService.editResume(this.aboutMe, this.aboutMeId).subscribe((res) => {
    //   console.log(res);

    // })
    // this.isEditAbout = false;
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
          // let arr: any = [];
          // res?.data ? res?.data?.search_result?.forEach((item: any) => {
          //   arr?.push({
          //     coupon_name: item?.coupon_name ? item?.coupon_name : '',
          //     coupon_picture: item?.coupon_picture ? item?.coupon_picture : '',
          //     description: item?.description ? item?.description : '',
          //   })
          // }) : '';
          this.searchResults = res;
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

  // getResume()
  // {
  //   this.homeService.getResume().subscribe((res)=>{
  //     console.log(res);

  //   })
  // }
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
    const file: File = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (e: any) => {
      this._handleReaderLoadedBgImage(e);
      this.profileService.updateCoverImage(file).subscribe((res) => {

      });
      this.cdr.detectChanges();
    }
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

  editProfile(): any {
    const ref = this.dialogService.open(EditProfileModalComponent, {
      header: this.publicService?.translateTextFromJson('profile.editProfile'),
      width: '55%',
      styleClass: 'apply-job-dialog',
    });

    ref.onClose.subscribe((res: any) => {
      if (res?.listChanged) {
        this.getProfileDetails();
      }
    });
  }
  addOrEditEducation(type?: any, id?: any): any {
    const ref = this.dialogService.open(AddEditEducationComponent, {
      header: type == 'edit' ? this.publicService?.translateTextFromJson('profile.editEducation') : this.publicService?.translateTextFromJson('profile.addEducation'),
      data: { type: type, id: id },
      width: '55%',
      styleClass: 'apply-job-dialog',
    });

    ref.onClose.subscribe((res: any) => {
      if (res?.listChanged) {
        this.getProfileDetails();
      }
    });
  }
  addOrEditCertification(type?: any, id?: any): any {
    const ref = this.dialogService.open(AddEditCertificationComponent, {
      header: type == 'edit' ? this.publicService?.translateTextFromJson('profile.editCertification') : this.publicService?.translateTextFromJson('profile.addCertification'),
      data: { type: type, id: id },
      width: '55%',
      styleClass: 'apply-job-dialog',
    });
    ref.onClose.subscribe((res: any) => {
      if (res?.listChanged) {
        this.getProfileDetails();
      }
    });
  }
  addOrEditExperience(type?: any, id?: any): any {
    const ref = this.dialogService.open(AddEditExperienceComponent, {
      header: type == 'edit' ? this.publicService?.translateTextFromJson('profile.editExperience') : this.publicService?.translateTextFromJson('profile.addExperience'),
      data: { type: type, id: id },
      width: '55%',
      styleClass: 'apply-job-dialog',
    });
    ref.onClose.subscribe((res: any) => {
      if (res?.listChanged) {
        this.getProfileDetails();
      }
    });
  }
  addOrEditLanguage(type?: any, id?: any): any {
    const ref = this.dialogService.open(AddEditLanguageComponent, {
      header: type == 'edit' ? this.publicService?.translateTextFromJson('profile.editLanguage') : this.publicService?.translateTextFromJson('profile.addLanguage'),
      width: '55%',
      data: { type: type, id: id },
      styleClass: 'apply-job-dialog',
    });
    ref.onClose.subscribe((res: any) => {
      if (res?.listChanged) {
        this.getProfileDetails();
      }
    });
  }
  addOrEditSkill(type?: any, id?: any): any {
    const ref = this.dialogService.open(AddEditSkillComponent, {
      header: type == 'edit' ? this.publicService?.translateTextFromJson('profile.editSkill') : this.publicService?.translateTextFromJson('profile.addSkill'),
      width: '55%',
      data: { type: type, id: id },
      styleClass: 'apply-job-dialog',
    });
    ref.onClose.subscribe((res: any) => {
      if (res?.listChanged) {
        this.getProfileDetails();
      }
    });
  }
}
