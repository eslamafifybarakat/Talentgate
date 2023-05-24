import { TranslationService } from 'src/app/shared/services/i18n/translation.service';
import { CheckValidityService } from 'src/app/shared/services/check-validity/check-validity.service';
import { ConfirmPasswordValidator } from './../../../shared/configs/confirm-password-validator';
import { AlertsService } from 'src/app/core/services/alerts/alerts.service';
import { PublicService } from 'src/app/shared/services/public.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { patterns } from 'src/app/shared/configs/patternValidations';
import { CountryISO, SearchCountryField } from 'ngx-intl-tel-input';
import { AuthUserService } from '../../services/auth-user.service';
import { keys } from 'src/app/shared/configs/localstorage-key';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  private unsubscribe: Subscription[] = [];
  showNextContent: boolean = false;
  currentLanguage: any;

  step: any;

  countries: any = [];
  isLoadingCountry: boolean = false;
  cities: any = [];

  cvFileName: any;
  cvFilePath: any;
  imgFilePath: any;

  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [
    CountryISO.Egypt,
    CountryISO.UnitedKingdom
  ];

  constructor(
    public checkValidityService: CheckValidityService,
    public translationService: TranslationService,
    private authUserService: AuthUserService,
    public alertsService: AlertsService,
    public publicService: PublicService,
    private cdr: ChangeDetectorRef,
    protected router: Router,
    public fb: FormBuilder
  ) { }

  ngOnInit() {
    this.step = 1;
    this.currentLanguage = window?.localStorage?.getItem(keys?.language);
  }

  firstRegisterForm = this.fb?.group(
    {
      username: [
        '',
        {
          validators: [
            Validators.required,
            Validators.pattern(patterns?.userName),
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
      password: [
        '',
        {
          validators: [
            Validators.required,
            // Validators?.pattern(patterns?.password)
          ],
          updateOn: 'blur',
        },
      ],
      confirmPassword: [
        '',
        {
          validators: [
            Validators.required,
            // Validators?.pattern(patterns?.password)
          ],
          updateOn: 'blur',
        },
      ],
    },
    {
      validator: ConfirmPasswordValidator?.MatchPassword,
    }
  );
  get firstFormControls(): any {
    return this.firstRegisterForm?.controls;
  }

  secondRegisterForm = this.fb?.group({
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
        updateOn: 'blur',
      },
    ],
    city: [
      '',
      {
        validators: [
          Validators.required,
        ],
        updateOn: 'blur',
      },
    ],
    cv: [
      '',
      {
        validators: [
          Validators.required,
        ],
        updateOn: 'blur',
      },
    ],
  });
  get secondFormControls(): any {
    return this.secondRegisterForm?.controls;
  }

  submitFirstForm(): void {
    if (this.firstRegisterForm?.valid) {
      this.step += 1;
      this.getCountries();
    } else {
      this.checkValidityService?.validateAllFormFields(this.firstRegisterForm);
    }
    this.cdr?.detectChanges();
  }
  submitSecondRegForm(): void {
    console.log(this.secondRegisterForm?.value);

    if (this.secondRegisterForm?.valid) {
      this.publicService?.show_loader?.next(true);
      let formInfo: any = this.secondRegisterForm?.value;
      let data: any = {
        full_name: this.firstRegisterForm?.value?.username,
        email: this.firstRegisterForm?.value?.email,
        password: this.firstRegisterForm?.value?.password,
        phone_number: formInfo.phone_number?.number,
        country_code: formInfo.phone_number?.countryCode,
        country: formInfo?.country?.id,
        city: formInfo.city,
        image: this.imgFilePath,
        cv: { name_cv: this.cvFilePath },
      };

      this.authUserService?.signup(data)?.subscribe(
        (res: any) => {
          if (res?.code == 200) {
            this.router?.navigate(['/login']);
            // window.localStorage.setItem(keys.token, res?.data?.token);
            // window.localStorage.setItem(
            //   keys.userLoginData,
            //   JSON.stringify(res?.data?.user)
            // );
            this.publicService?.show_loader?.next(false);
          } else {
            this.publicService?.show_loader?.next(false);
            res?.error?.message
              ? this.alertsService?.openSweetAlert('error', res?.error?.message) : '';
          }
        },
        (err: any) => {
          err ? this.alertsService?.openSweetAlert('error', err) : '';
          this.publicService?.show_loader?.next(false);
        }
      );
    } else {
      this.publicService?.show_loader?.next(false);
      this.checkValidityService?.validateAllFormFields(this.secondRegisterForm);
    }
    this.cdr?.detectChanges();
  }

  selectImage(event: any): void {
    let fileReader = new FileReader();
    fileReader.readAsDataURL(event?.target?.files[0]);
    fileReader.onload = this._handleReaderLoadedImage.bind(this);
  }
  _handleReaderLoadedImage(e: any): void {
    var reader = e.target;
    let formData = new FormData();
    let image = this.publicService?.base64ToImageFile(reader.result, "image");
    formData.append("image_name", image);
    this.authUserService?.uploadImage(formData)?.subscribe(
      (res: any) => {
        if (res?.code == 200) {
          this.imgFilePath = res?.data?.file_Path;
        } else {
          res?.message ? this.alertsService?.openSweetAlert('info', res?.message) : '';
        }
      },
      (err: any) => {
        err?.message ? this.alertsService?.openSweetAlert('error', err?.message) : '';
      });
    this.cdr?.detectChanges();
  }

  getCountries(): any {
    this.isLoadingCountry = true;
    this.authUserService?.getCountries()?.subscribe(
      (res: any) => {
        if (res?.data) {
          this.countries = res?.data ? res?.data?.countries : [];
          this.isLoadingCountry = false;
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
    this.secondRegisterForm?.get('city')?.reset();
    this.countries?.forEach((item: any) => {
      if (item?.id == event?.id) {
        this.cities = item?.cities ? item?.cities : [];
      }
    });
  }

  selectFile(event: any): void {
    this.secondRegisterForm?.get('cv')?.setValue(event?.target?.files[0]);
    this.cvFileName = event?.target?.files[0]?.name;
    console.log(event?.target?.files[0]);

    let fileReader = new FileReader();
    fileReader.readAsDataURL(event?.target?.files[0]);
    fileReader.onload = this._handleReaderLoaded.bind(this);

  }
  _handleReaderLoaded(e: any): void {
    var reader = e.target;
    let formData = new FormData();
    let file = this.publicService?.base64ToImageFile(reader.result, "file");
    formData.append("name_cv", file);
    this.authUserService?.uploadcv(formData)?.subscribe(
      (res: any) => {
        if (res?.code == 200) {
          this.cvFilePath = res?.data?.file_Path;
        } else {
          res?.message ? this.alertsService?.openSweetAlert('info', res?.message) : '';
        }
      },
      (err: any) => {
        err?.message ? this.alertsService?.openSweetAlert('error', err?.message) : '';
      });
    this.cdr?.detectChanges();
  }
  clearCvFile(): void {
    this.cvFileName = null;
    this.secondRegisterForm?.get('cv')?.reset();
  }

  ngOnDestroy(): void {
    this.unsubscribe?.forEach((sb) => sb?.unsubscribe());
  }
}
