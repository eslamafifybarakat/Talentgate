import { ProfileService } from './../../../../services/profile.service';
import { CheckValidityService } from './../../../../../shared/services/check-validity/check-validity.service';
import { AuthUserService } from './../../../../../auth/services/auth-user.service';
import { PublicService } from './../../../../../shared/services/public.service';
import { AlertsService } from 'src/app/core/services/alerts/alerts.service';
import { environment } from './../../../../../../environments/environment';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { patterns } from 'src/app/shared/configs/patternValidations';
import { CountryISO, SearchCountryField } from 'ngx-intl-tel-input';
import { HomeService } from 'src/app/pages/services/home.service';
import { Validators, FormBuilder } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-education',
  templateUrl: './edit-education.component.html',
  styleUrls: ['./edit-education.component.scss']
})
export class EditEducationComponent implements OnInit {
  private unsubscribe: Subscription[] = [];

  userProfileDetails: any
  imgPath: any = environment?.imgPath;
  currentStep: any;
  isLoading: boolean = false;

  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [
    CountryISO.Egypt,
    CountryISO.UnitedKingdom
  ];

  countries: any = [];
  isLoadingCountry: boolean = false;
  cities: any = [];
  degrees: any = [
    {
      "_id": "640f4f876a313a46e4a3c307",
      "name": "bachelor",
      "state": 0
    },
    {
      "_id": "640f4f876a313a46e4a3c309",
      "name": "string",
      "state": 0
    },
    {
      "_id": "640f4f876a313a46e4a3c308",
      "name": "string2",
      "state": 0
    }
  ]
  profileForm = this.fb?.group(
    {
      majorName: [
        '',
        {
          validators: [
            Validators.required,
            Validators?.minLength(3),
          ],
          updateOn: 'blur',
        },
      ],
      instituteName: [
        '',
        {
          validators: [
            Validators.required,
            Validators?.minLength(3),
          ],
          updateOn: 'blur',
        },
      ],
      degreeName: [
        null,
        {
          validators: [
            Validators.required,
          ]
        },
      ],
      startDate: [
        null,
        {
          validators: [
            Validators.required,
          ],
        },
      ],
      endDate: [
        null,
        {
          validators: [
            Validators.required,
          ],
        },
      ],
      state: [null, []]
    }
  );
  get formControls(): any {
    return this.profileForm?.controls;
  }
  constructor(
    private checkValidityService: CheckValidityService,
    private authUserService: AuthUserService,
    private profileService: ProfileService,
    private alertsService: AlertsService,
    public publicService: PublicService,
    private homeService: HomeService,
    private cdr: ChangeDetectorRef,
    private ref: DynamicDialogRef,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.getProfileDetails();
  }
  getProfileDetails() {
    this.isLoading = true;
    this.homeService.getProfileDetails().subscribe((res: any) => {
      if (res) {
        this.userProfileDetails = res.data.user;
        this.patchValue();
        console.log(this.userProfileDetails);
        this.isLoading = false;
      } else {
        this.isLoading = false;
      }
    })
  }
  patchValue(): void {
    let endDate: any = new Date(this.userProfileDetails?.educations[0]?.end_date);
    let startDate: any = new Date(this.userProfileDetails?.educations[0]?.start_date);
    let state: any = this.userProfileDetails?.educations[0]?.state == 1 ? true : false;
    this.profileForm?.patchValue({
      majorName: this.userProfileDetails?.educations[0]?.major_name?.name,
      instituteName: this.userProfileDetails?.educations[0]?.institute_name,
      degreeName: this.userProfileDetails?.educations[0]?.degree_name,
      endDate: endDate,
      startDate: startDate,
      state: state
    });
  }

  submit(): void {
    if (this.profileForm?.valid) {
      this.publicService?.show_loader?.next(true);
      let formInfo: any = this.profileForm?.value;
      let data = {
        full_name: formInfo?.username,
        email: formInfo?.email,
        phone_number: formInfo.phone_number?.number,
        country_code: formInfo.phone_number?.countryCode,
        country: formInfo?.country?._id,
        city: formInfo?.city?._id,
        state: formInfo?.state == true ? 1 : 0
      };
      this.profileService?.editProfile(data)?.subscribe(
        (res: any) => {
          if (res?.status == 200) {
            this.ref?.close({ listChanged: true });
            this.publicService?.show_loader?.next(false);
          } else {
            this.publicService?.show_loader?.next(false);
            res?.error?.message
              ? this.alertsService?.openSweetAlert('error', res?.error?.message)
              : '';
          }
        },
        (err: any) => {
          err ? this.alertsService?.openSweetAlert('error', err) : '';
          this.publicService?.show_loader?.next(false);
        }
      );
    } else {
      this.publicService?.show_loader?.next(false);
      this.checkValidityService?.validateAllFormFields(this.profileForm);
    }
    this.cdr?.detectChanges();
  }

  cancel(): void {
    this.ref?.close();
  }
  remove(): void { }
  ngOnDestroy(): void {
    this.unsubscribe?.forEach((sb) => sb?.unsubscribe());
  }
}
