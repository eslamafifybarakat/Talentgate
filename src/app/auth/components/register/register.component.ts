import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AppRoutes } from 'src/app/shared/configs/routes';
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

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

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
  ) { }

  ngOnInit(): void {
    this.currentLanguage = window?.localStorage?.getItem(keys?.language);
  }

  registrerForm = this.fb?.group(
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
    return this.registrerForm?.controls;
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
    if (this.registrerForm?.valid) {
      this.publicService?.show_loader?.next(true);
      let data = {
        username: this.registrerForm?.value?.username,
        password: this.registrerForm?.value?.password,
        rememberClient: true
      };
      setTimeout(() => {
        this.router?.navigateByUrl('/dashboard');
        this.publicService?.show_loader?.next(false);
        console.log(this.registrerForm?.value);

      }, 1000);

    } else {
      this.publicService?.show_loader?.next(false);
      this.checkValidityService?.validateAllFormFields(this.registrerForm);
    }
    this.cdr?.detectChanges();
  }

  ngOnDestroy(): void {
    this.unsubscribe?.forEach((sb) => sb?.unsubscribe());
  }
}

