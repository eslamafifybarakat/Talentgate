import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CheckValidityService } from 'src/app/shared/services/check-validity/check-validity.service';
import { AuthUserService } from '../../services/auth-user.service';
import { TranslationService } from 'src/app/shared/services/i18n/translation.service';
import { AlertsService } from 'src/app/core/services/alerts/alerts.service';
import { PublicService } from 'src/app/shared/services/public.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { keys } from 'src/app/shared/configs/localstorage-key';
import { patterns } from 'src/app/shared/configs/patternValidations';
// import { ConfirmPasswordValidator } from 'src/app/shared/configs/confirm-password-validator';
interface City {
  name: string;
  code: string;
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  private unsubscribe: Subscription[] = [];
  showNextContent: boolean = false;
  currentLanguage: any;
  cities!: City[];
  countries!: any[];
  selectedCities!: City[];
  selectedCountry!: string;

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
    this.currentLanguage = window?.localStorage?.getItem(keys?.language);

    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' },
    ];

    this.countries = [
      { name: 'Australia', code: 'AU' },
      { name: 'Brazil', code: 'BR' },
      { name: 'China', code: 'CN' },
      { name: 'Egypt', code: 'EG' },
      { name: 'France', code: 'FR' },
      { name: 'Germany', code: 'DE' },
      { name: 'India', code: 'IN' },
      { name: 'Japan', code: 'JP' },
      { name: 'Spain', code: 'ES' },
      { name: 'United States', code: 'US' }
    ];
  }

  firstRegForm = this.fb?.group(
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
            Validators?.minLength(8),
            Validators?.maxLength(20),
          ],
          updateOn: 'blur',
        },
      ],
      // confirmPassword: [
      //   '',
      //   {
      //     validators: [
      //       Validators.required,
      //       Validators?.minLength(8),
      //       Validators?.maxLength(20),
      //     ],
      //     updateOn: 'blur',
      //   },
      // ],
    },
    // {
    //   validator: ConfirmPasswordValidator?.MatchPassword,
    // }
  );

  get firstFormControls(): any {
    return this.firstRegForm?.controls;
  }

  submitFirstRegForm(): void {
    if (this.firstRegForm?.valid) {
      this.showNextContent = true;
      this.publicService?.show_loader?.next(true);
      setTimeout(() => {
        this.publicService?.show_loader?.next(false);
      }, 1000);
    } else {
      this.publicService?.show_loader?.next(false);
      this.checkValidityService?.validateAllFormFields(this.firstRegForm);
    }
    this.cdr?.detectChanges();
  }

  // Second Reg Form
  secondRegForm = this.fb?.group({
    phone_number: [
      '',
      {
        validators: [
          Validators.required,
          Validators?.minLength(10),
        ],
        updateOn: 'blur',
      },
    ],
    country_code: [''],
    country: [
      '',
      {
        validators: [
          Validators.required,
          Validators?.minLength(3),
        ],
        updateOn: 'blur',
      },
    ],
    city: [
      '',
      {
        validators: [
          Validators.required,
          Validators?.minLength(3),
        ],
        updateOn: 'blur',
      },
    ],
    image: [
      '',
      {
        validators: [
          Validators.required,
        ],
        updateOn: 'blur',
      },
    ],
    name_cv: [
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
    return this.secondRegForm?.controls;
  }

  submitSecondRegForm(): void {
    if (this.secondRegForm?.valid) {
      this.publicService?.show_loader?.next(true);

      let data = {
        full_name: this.firstRegForm?.value?.username,
        email: this.firstRegForm?.value?.email,
        password: this.firstRegForm?.value?.password,
        phone_number: this.secondRegForm?.value.phone_number,
        country_code: this.secondRegForm?.value.country,
        country: this.secondRegForm?.value.country,
        city: this.secondRegForm?.value.city,
        image: this.secondRegForm?.value.image,
        cv: { name_cv: this.secondRegForm?.value.name_cv },
      };

      this.authUserService?.signup(data)?.subscribe(
        (res: any) => {
          if (res?.statusCode == 200) {
            this.router?.navigate(['/login']);
            window.localStorage.setItem(keys.token, res?.data?.token);
            window.localStorage.setItem(
              keys.userLoginData,
              JSON.stringify(res?.data?.user)
            );
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
      setTimeout(() => {
        this.router?.navigateByUrl('/dashboard');
        this.publicService?.show_loader?.next(false);
        console.log(this.secondRegForm?.value);
      }, 1000);
    } else {
      this.publicService?.show_loader?.next(false);
      this.checkValidityService?.validateAllFormFields(this.secondRegForm);
    }
    this.cdr?.detectChanges();
  }

  // getUploadFiles(ev: any): void {
  //   console.log(ev);
  // }
  // uploadFile(ev: any): void {
  //   console.log(ev);
  // }

  // getCurrentUserData(): void {
  //   this.authUserService?.getUserData()?.subscribe((res: any) => {
  //     // this.authUserService?.saveUserData(res);
  //   });
  // }

  ngOnDestroy(): void {
    this.unsubscribe?.forEach((sb) => sb?.unsubscribe());
  }
}
