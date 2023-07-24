import { CheckValidityService } from '../../../../../shared/services/check-validity/check-validity.service';
import { AuthUserService } from '../../../../../auth/services/auth-user.service';
import { PublicService } from '../../../../../shared/services/public.service';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AlertsService } from 'src/app/core/services/alerts/alerts.service';
import { ProfileService } from '../../../../services/profile.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CountryISO, SearchCountryField } from 'ngx-intl-tel-input';
import { HomeService } from 'src/app/pages/services/home.service';
import { Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-add-edit-experience',
  templateUrl: './add-edit-experience.component.html',
  styleUrls: ['./add-edit-experience.component.scss']
})
export class AddEditExperienceComponent implements OnInit {
  private unsubscribe: Subscription[] = [];

  userProfileDetails: any;
  isLoading: boolean = false;
  modalData: any;
  type: any;
  id: any;
  data: any;

  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [
    CountryISO.Egypt,
    CountryISO.UnitedKingdom
  ];

  countries: any = [];
  isLoadingCountry: boolean = false;
  cities: any = [];

  isSelectStartDate: boolean = false;
  minEndDate: any;

  skills: any = [];
  filteredSkills: any = [];
  filteredCompanies: any = [];

  isLoadingSkills: boolean = false;

  profileForm = this.fb?.group(
    {
      jobTitle: [
        '',
        {
          validators: [
            Validators.required,
            Validators?.minLength(3),
          ],
          updateOn: 'blur',
        },
      ],
      companyName: [
        '',
        {
          validators: [
            Validators.required,
            // Validators?.minLength(3),
          ],
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
        null,
        {
          validators: [
            Validators.required,
          ],
        },
      ],
      skills: [
        null,
        {
          validators: [
            Validators.required,
          ],
        },
      ],
      description: [
        '',
        {
          validators: [
            Validators?.minLength(3),
          ],
          updateOn: 'blur',
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
      isCurrentJob: [null, []]
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
    private config: DynamicDialogConfig,
    private homeService: HomeService,
    private cdr: ChangeDetectorRef,
    private ref: DynamicDialogRef,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.modalData = this.config?.data;
    this.type = this.modalData?.type;
    this.id = this.modalData?.id;
    if (this.type == 'edit') {
      this.getProfileDetails();
    } else {
      this.getCountries();
      this.getSkills();
    }
  }

  getProfileDetails() {
    this.isLoading = true;
    this.homeService.getProfileDetails().subscribe((res: any) => {
      if (res) {
        this.userProfileDetails = res.data.user;
        this.userProfileDetails?.professional_experiences?.forEach((item: any) => {
          if (item?._id == this.id) {
            this.data = item;
          }
        });
        console.log(this.data);

        this.patchValue();
        this.isLoading = false;
      } else {
        this.isLoading = false;
      }
    })
  }
  patchValue(): void {
    let endDate: any = new Date(this.data?.end_date);
    let startDate: any = new Date(this.data?.start_date);
    let isCurrentJob: any = this.data?.is_current_job == 1 ? true : false;
    let companyName: any = { name: this.data?.company?.name_company };
    this.profileForm?.patchValue({
      jobTitle: this.data?.job_title,
      companyName: companyName,
      description: this.data?.description,
      endDate: endDate,
      startDate: startDate,
      isCurrentJob: isCurrentJob,
    });
    this.getCountries();
    this.getSkills();
  }

  getCountries(): any {
    this.isLoadingCountry = true;
    this.authUserService?.getCountries()?.subscribe(
      (res: any) => {
        if (res?.status == 200) {
          this.countries = res?.data ? res?.data?.countries : [];
          this.isLoadingCountry = false;
          let arr: any = [];
          console.log(this.userProfileDetails);
          this.countries?.forEach((item: any) => {
            if (this.data?.country?._id == item?._id) {
              arr = item?.cities ? item?.cities : [];
              this.cities = arr;
              this.cities?.forEach((city: any) => {
                if (this.data?.city?._id == city?._id) {
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

  selectStartDate(event: any): void {
    if (event) {
      this.minEndDate = event;
      this.isSelectStartDate = true;
    }
    this.profileForm?.get('endDate')?.reset();
  }
  clearStartDate(): void {
    this.isSelectStartDate = false;
    this.publicService?.removeValidators(this.profileForm, ['endDate']);
    this.profileForm?.get('endDate')?.reset();
  }
  getSkills(): any {
    this.isLoadingCountry = true;
    this.profileService?.getSkills()?.subscribe(
      (res: any) => {
        if (res?.status == 200) {
          let arr: any = [];
          arr = res?.data ? res?.data : [];
          this.skills = arr;
          this.isLoadingSkills = false;
          let arrSkills: any = [];
          this.skills?.forEach((item: any) => {
            this.data?.skills?.forEach((element: any) => {
              if (item?._id == element?._id) {
                arrSkills?.push(item);
              }
            });
          });
          this.profileForm?.patchValue({
            skills: arrSkills
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
  filterCompanies(event: any) {
    let query = event.query;
    this.profileService?.getCompanies(query)?.subscribe(
      (res: any) => {
        if (res?.status == 200) {
          let arr: any = [];
          res?.data ? res?.data : [];
          res?.data ? res?.data?.forEach((item: any) => {
            arr?.push({
              name: item?.name_company
            })
          }) : '';
          this.filteredCompanies = arr;
        } else {
          res?.message ? this.alertsService?.openSweetAlert('info', res?.message) : '';
        }
      },
      (err: any) => {
        err?.message ? this.alertsService?.openSweetAlert('error', err?.message) : '';
      });
  }

  filterSkills(event: any) {
    let query = event.query;
    this.profileService?.getSkill(query)?.subscribe(
      (res: any) => {
        if (res?.status == 200) {
          let arr: any = [];
          arr = res?.data ? res?.data : [];
          this.filteredSkills = arr;
        } else {
          res?.message ? this.alertsService?.openSweetAlert('info', res?.message) : '';
          this.isLoadingSkills = false;
        }
      },
      (err: any) => {
        err?.message ? this.alertsService?.openSweetAlert('error', err?.message) : '';
        this.isLoadingSkills = false;
      });
  }

  submit(): void {
    if (this.profileForm?.valid) {
      this.publicService?.show_loader?.next(true);
      let formInfo: any = this.profileForm?.value;
      let skillsIds: any = [];
      formInfo?.skills?.forEach((item: any) => {
        skillsIds?.push(item?._id);
      });
      let data = {
        job_title: formInfo?.jobTitle,
        company: formInfo?.companyName?.name,
        country: formInfo?.country?._id,
        city: formInfo.city?._id,
        description: formInfo?.description,
        start_date: formInfo?.startDate,
        end_date: formInfo?.endDate,
        is_current_job: formInfo?.isCurrentJob == true ? 1 : 0,
        // job_type: 0,
        skills: skillsIds
      };
      this.profileService?.addEditExperience(data, this.id ? this.id : null)?.subscribe(
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
      this.checkValidityService?.validateAllFormFields(this.profileForm);
    }
    this.cdr?.detectChanges();
  }
  remove(): void {
    this.publicService?.show_loader?.next(true);
    this.profileService?.deleteExperience(this.data?._id)?.subscribe(
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
  cancel(): void {
    this.ref?.close();
  }

  ngOnDestroy(): void {
    this.unsubscribe?.forEach((sb) => sb?.unsubscribe());
  }
}
