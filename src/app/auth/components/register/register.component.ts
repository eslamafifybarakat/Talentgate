import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CheckValidityService } from 'src/app/shared/services/check-validity/check-validity.service';
import { AuthUserService } from '../../services/auth-user.service';
import { TranslationService } from 'src/app/shared/services/i18n/translation.service';
import { AlertsService } from 'src/app/core/services/alerts/alerts.service';
import { PublicService } from 'src/app/shared/services/public.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  checked!: boolean;
  // cv
  cv: any
  selectedFile: File | null = null;
  cvUrl: string | null = null;
  step: any;
  countries: any = [];
  isLoadingCountry: boolean = false;
  cities: any = [];

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
    this.step = 2;
    this.currentLanguage = window?.localStorage?.getItem(keys?.language);
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
      this.step += 1;
      // this.publicService?.show_loader?.next(true);
      setTimeout(() => {
        // this.publicService?.show_loader?.next(false);
      }, 1000);
    } else {
      this.publicService?.show_loader?.next(false);
      this.checkValidityService?.validateAllFormFields(this.firstRegForm);
    }
    this.cdr?.detectChanges();
  }

  // Second Reg Form
  secondRegisterForm = this.fb?.group({
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
      null,
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
    return this.secondRegisterForm?.controls;
  }

  submitSecondRegForm(): void {
    if (this.secondRegisterForm?.valid) {
      this.publicService?.show_loader?.next(true);

      let data = {
        full_name: this.firstRegForm?.value?.username,
        email: this.firstRegForm?.value?.email,
        password: this.firstRegForm?.value?.password,
        phone_number: this.secondRegisterForm?.value.phone_number,
        country_code: this.secondRegisterForm?.value.country,
        country: this.secondRegisterForm?.value.country,
        city: this.secondRegisterForm?.value.city,
        image: this.secondRegisterForm?.value.image,
        cv: { name_cv: this.secondRegisterForm?.value.name_cv },
      };

      // this.authUserService?.signup(data)?.subscribe(
      //   (res: any) => {
      //     if (res?.statusCode == 200) {
      //       this.router?.navigate(['/login']);
      //       window.localStorage.setItem(keys.token, res?.data?.token);
      //       window.localStorage.setItem(
      //         keys.userLoginData,
      //         JSON.stringify(res?.data?.user)
      //       );
      //       this.publicService?.show_loader?.next(false);
      //     } else {
      //       this.publicService?.show_loader?.next(false);
      //       res?.error?.message
      //         ? this.alertsService?.openSweetAlert('error', res?.error?.message) : '';
      //     }
      //   },
      //   (err: any) => {
      //     err ? this.alertsService?.openSweetAlert('error', err) : '';
      //     this.publicService?.show_loader?.next(false);
      //   }
      // );
      setTimeout(() => {
        this.router?.navigateByUrl('/dashboard');
        this.publicService?.show_loader?.next(false);
        console.log(this.secondRegisterForm?.value);
      }, 1000);
    } else {
      this.publicService?.show_loader?.next(false);
      this.checkValidityService?.validateAllFormFields(this.secondRegisterForm);
    }
    this.cdr?.detectChanges();
  }

  ngOnDestroy(): void {
    this.unsubscribe?.forEach((sb) => sb?.unsubscribe());
  }


  // getCountries(){
  //   this.authUserService?.countries()?.subscribe(
  //     (res: any) => {
  //        this.countries = data.countries
  //       // console.log( "ayat");
  //     },

  //   );
  // }
  // cv
  uploadedFile: File | null = null;
  onUpload(event: any) {
    if (event.files && event.files.length > 0) {
      this.uploadedFile = event.files[0];
    }
  }
}
