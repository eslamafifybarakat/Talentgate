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
import { Subscription } from 'rxjs';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-apply-job-stepper',
  templateUrl: './apply-job-stepper.component.html',
  styleUrls: ['./apply-job-stepper.component.scss']
})
export class ApplyJobStepperComponent implements OnInit {
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
  resume: string = 'oldCv';
  cvFile: any;
  cvFileName: any;
  cvLink: any;
  questions: any = [];

  firstForm: any = this.fb?.group(
    {
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
    }
  );
  get formControls(): any {
    return this.firstForm?.controls;
  }

  secondForm = this.fb?.group(
    {
      message: [
        '',
        {
          validators: [
            // Validators.required,
            Validators?.minLength(3),
          ],
          updateOn: 'blur',
        },
      ],
    }
  );
  get secondFormControls(): any {
    return this.secondForm?.controls;
  }

  constructor(
    public checkValidityService: CheckValidityService,
    private authUserService: AuthUserService,
    public publicService: PublicService,
    private alertsService: AlertsService,
    private homeService: HomeService,
    private cdr: ChangeDetectorRef,
    private ref: DynamicDialogRef,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.currentStep = 0;
    this.getProfileDetails();
  }
  getProfileDetails() {
    this.isLoading = true;
    this.homeService.getProfileDetails().subscribe((res: any) => {
      if (res) {
        this.userProfileDetails = res.data.user;
        this.patchValue();
        console.log(this.userProfileDetails);
        this.userProfileDetails['questions'] = [
          { question: 'Lorem ipsum dolor sit amet ?', answer: 'Lorem ipsum dolor sit amet' },
          { question: 'Lorem ipsum dolor sit amet ?', answer: 'Lorem ipsum dolor sit amet' },
          { question: 'Lorem ipsum dolor sit amet ?', answer: 'Lorem ipsum dolor sit amet' },
          { question: 'Lorem ipsum dolor sit amet ?', answer: 'Lorem ipsum dolor sit amet' },
        ]
        this.questions = this.userProfileDetails?.questions;
        this.isLoading = false;
      } else {
        this.isLoading = false;
      }
    })
  }
  patchValue(): void {
    this.firstForm?.patchValue({
      email: this.userProfileDetails?.email,
      phone_number: {
        "number": "21644533463",
        "internationalNumber": "+216 44 533 463",
        "nationalNumber": "44 533 463",
        "e164Number": "+21644533463",
        "countryCode": "TN",
        "dialCode": "+216",
      }
    });
    this.getCountries();
  }
  next(step: any): void {
    if (step == 0) {
      if (this.firstForm?.valid) {
        this.currentStep = 1;
      } else {
        this.checkValidityService?.validateAllFormFields(this.firstForm);
      }
    }
    if (step == 1) {
      this.currentStep = 2;
    }
    if (step == 2) {
      this.currentStep = 3;
    }
    if (step == 3) {
      this.currentStep = 4;
    }
  }
  back(step: any): void {
    if (step == 1) {
      this.currentStep = 0;
    }
    if (step == 2) {
      this.currentStep = 1;
    }
    if (step == 3) {
      this.currentStep = 2;
    }
    if (step == 4) {
      this.currentStep = 3;
    }
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
                  this.firstForm?.patchValue({
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
    this.firstForm?.get('city')?.reset();
    let arr: any = [];
    this.countries?.forEach((item: any) => {
      if (item?._id == event?.value?._id) {
        arr = item?.cities ? item?.cities : [];
        this.cities = arr;
      }
    });
  }
  downloadPdf(url: any): void {
    this.homeService?.downloadPDF(url);
  }

  selectFile(event: any): void {
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
        if (res?.status == 200) {
          this.resume = 'newCv';
          this.cvFile = res?.data;
        } else {
          res?.message ? this.alertsService?.openSweetAlert('info', res?.message) : '';
        }
      },
      (err: any) => {
        err?.message ? this.alertsService?.openSweetAlert('error', err?.message) : '';
      });
    this.cdr?.detectChanges();
  }

  confirm(): void {
    this.publicService?.show_loader?.next(true);
    let formInfo: any = this.firstForm?.value;
    let cv: any;
    if (this.cvFile != null) {
      cv = {
        name_cv: this.cvFileName,
        date_upload_cv: this.cvFile?.date_upload_cv,
        link: this.cvFile?.link
      }
    } else {
      cv = this.userProfileDetails?.cv;
    }
    let data = {
      email: formInfo?.email,
      phone_number: formInfo.phone_number?.number,
      country_code: formInfo.phone_number?.countryCode,
      country: formInfo?.country?._id,
      city: formInfo.city?._id,
      cv: cv,
      questions: this.questions,
      message: this.secondForm?.value?.message
    };
    this.homeService?.applyJob(data)?.subscribe(
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
    this.cdr?.detectChanges();
  }

  ngOnDestroy(): void {
    this.unsubscribe?.forEach((sb) => sb?.unsubscribe());
  }
}
