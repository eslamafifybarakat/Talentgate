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
  selector: 'app-edit-profile-modal',
  templateUrl: './edit-profile-modal.component.html',
  styleUrls: ['./edit-profile-modal.component.scss']
})
export class EditProfileModalComponent implements OnInit {
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

  profileForm = this.fb?.group(
    {
      fullName: [
        '',
        {
          validators: [
            Validators.required,
            Validators?.minLength(3),
          ],
          updateOn: 'blur',
        },
      ],
      email: [
        '',
        {
          validators: [
            Validators.required,
            Validators.pattern(patterns?.email),
            Validators?.minLength(3),
          ],
          updateOn: 'blur',
        },
      ],
      phone_number: [
        null,
        {
          validators: [
            Validators.required,
          ],
          updateOn: 'blur',
        },
      ],
      country: [
        null,
        {
          validators: [
            Validators.required,
          ],
        },
      ],
      city: [
        '',
        {
          validators: [
            Validators.required,
          ],
        },
      ],
      birthDate: [
        '',
        {
          validators: [
            Validators.required,
          ],
        },
      ],
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
    let birthDate: any = new Date(this.userProfileDetails?.date_birth);
    this.profileForm?.patchValue({
      fullName: this.userProfileDetails?.full_name,
      email: this.userProfileDetails?.email,
      birthDate: birthDate

    });
    this.getCountries();
  }

  getCountries(): any {
    this.isLoadingCountry = true;
    this.authUserService?.getCountries()?.subscribe(
      (res: any) => {
        if (res?.status == 200) {
          this.countries = res?.data ? res?.data?.countries : [];
          this.isLoadingCountry = false;
          let arr: any = [];
          this.countries?.forEach((item: any) => {
            if (this.userProfileDetails?.country?._id == item?._id) {
              arr = item?.cities ? item?.cities : [];
              this.cities = arr;
              this.cities?.forEach((city: any) => {
                if (this.userProfileDetails?.city?._id == city?._id) {
                  this.profileForm?.patchValue({
                    country: item,
                    city: city
                  });
                }
              });
            }
          });
        } else {
          res?.message ? this.alertsService?.openSweetAlert('info', res?.message) : '';
          this.isLoadingCountry = false;
        }
      },
      (err: any) => {
        err?.message ? this.alertsService?.openSweetAlert('error', err?.message) : '';
        this.isLoadingCountry = false;
      });
    this.cdr?.detectChanges();
  }
  onChangeCountry(event: any): void {
    this.profileForm?.get('city')?.reset();
    let arr: any = [];
    this.countries?.forEach((item: any) => {
      if (item?._id == event?.value?._id) {
        arr = item?.cities ? item?.cities : [];
        this.cities = arr;
      }
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
        city: formInfo.city?._id,
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

  ngOnDestroy(): void {
    this.unsubscribe?.forEach((sb) => sb?.unsubscribe());
  }
}
