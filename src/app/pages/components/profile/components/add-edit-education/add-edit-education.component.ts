import { CheckValidityService } from '../../../../../shared/services/check-validity/check-validity.service';
import { PublicService } from '../../../../../shared/services/public.service';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AlertsService } from 'src/app/core/services/alerts/alerts.service';
import { ProfileService } from '../../../../services/profile.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/pages/services/home.service';
import { Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-edit-education',
  templateUrl: './add-edit-education.component.html',
  styleUrls: ['./add-edit-education.component.scss']
})
export class AddEditEducationComponent implements OnInit {
  private unsubscribe: Subscription[] = [];

  userProfileDetails: any;
  isLoading: boolean = false;
  modalData: any;
  type: any;
  id: any;
  data: any;

  isSelectStartDate: boolean = false;
  minEndDate: any;

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
  degrees: any;
  get formControls(): any {
    return this.profileForm?.controls;
  }
  constructor(
    private checkValidityService: CheckValidityService,
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
    }
    this.getDegreeName()
  }

  getDegreeName()
  {
    this.profileService.getDegreeName().subscribe((res)=>{
      console.log(res)
      this.degrees = res.data;
      console.log('dddddddddddddddddd',this.degrees)
    })
  }
  getProfileDetails() {
    this.isLoading = true;
    this.homeService.getProfileDetails().subscribe((res: any) => {
      if (res) {
        this.userProfileDetails = res.data.user;
        this.userProfileDetails?.educations?.forEach((item: any) => {
          if (item?._id == this.id) {
            this.data = item;
          }
        });
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
    let state: any = this.data?.state == 1 ? true : false;
    this.profileForm?.patchValue({
      majorName: this.data?.major_name?.name,
      instituteName: this.data?.institute_name,
      degreeName: this.data?.degree_name,
      endDate: endDate,
      startDate: startDate,
      state: state
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

  submit(): void {
    if (this.profileForm?.valid) {
      this.publicService?.show_loader?.next(true);
      let formInfo: any = this.profileForm?.value;
      let data = {
        degree_name: formInfo?.degreeName?.name,
        institute_name: formInfo?.instituteName,
        major_name: formInfo?.majorName,
        start_date: formInfo?.startDate,
        end_date: formInfo?.endDate,
        // state: formInfo?.state == true ? 1 : 0
      };
      this.profileService?.addEditEducation(data, this.id ? this.id : null)?.subscribe(
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
    this.profileService?.deleteEducation(this.id)?.subscribe(
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
