import { TranslationService } from './../../../shared/services/i18n/translation.service';
import { keys } from './../../../shared/configs/localstorage-key';
import { AppRoutes } from './../../../shared/configs/routes';
import { patterns } from './../../../shared/configs/patternValidations';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PublicService } from './../../../shared/services/public.service';
import { AlertsService } from './../../../core/services/alerts/alerts.service';
import { CheckValidityService } from './../../../shared/services/check-validity/check-validity.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthUserService } from '../../services/auth-user.service';
import { Subscription } from 'rxjs';
interface Country {
  name: string;
  code: string;
}
@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.scss','./../register/register.component.scss']
})
export class SingUpComponent implements OnInit {
  countries: Country[] | undefined;

  selectedCountries: Country[] | undefined;
  private unsubscribe: Subscription[] = [];
  currentLanguage: any;
  constructor(
    public checkValidityService: CheckValidityService,
    public translationService: TranslationService,
    private authUserService: AuthUserService,
    public alertsService: AlertsService,
    public publicService: PublicService,
    private cdr: ChangeDetectorRef,
    protected router: Router,
    public fb: FormBuilder,
  ) {

    this.countrie()
  }


  countrie(){
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
  ngOnInit(): void {
    this.currentLanguage = window?.localStorage?.getItem(keys?.language);
  }

  signUpForm = this.fb?.group(
    {
      username: ['', {
        validators: [
          Validators.required,
          Validators.pattern(patterns?.userName),
          Validators?.minLength(3)], updateOn: "blur"
      }],
      password: ['', {
        validators: [
          Validators.required,
          Validators?.minLength(8),
          Validators?.maxLength(20),
        ], updateOn: "blur"
      }],
      remember: [false, []]
    }
  );

  get formControls(): any {
    return this.signUpForm?.controls;
  }

  getCurrentUserData(): void {
    this.authUserService?.getUserData()?.subscribe((res: any) => {
      // this.authUserService?.saveUserData(res);
    })
  }

  forgetPassWord(): void {
    this.router?.navigateByUrl(`auth/${AppRoutes?.auth?.forgetPassword}`);
  }

  submit(): void {
    if (this.signUpForm?.valid) {
      this.publicService?.show_loader?.next(true);
      let data = {
        username: this.signUpForm?.value?.username,
        password: this.signUpForm?.value?.password,
        rememberClient: true
      };
      setTimeout(() => {
        this.router?.navigateByUrl('/dashboard');
        this.publicService?.show_loader?.next(false);
        console.log(this.signUpForm?.value);

      }, 1000);

    } else {
      this.publicService?.show_loader?.next(false);
      this.checkValidityService?.validateAllFormFields(this.signUpForm);
    }
    this.cdr?.detectChanges();
  }

  ngOnDestroy(): void {
    this.unsubscribe?.forEach((sb) => sb?.unsubscribe());
  }
}
