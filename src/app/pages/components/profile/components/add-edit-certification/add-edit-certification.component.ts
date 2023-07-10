import { CheckValidityService } from '../../../../../shared/services/check-validity/check-validity.service';
import { PublicService } from '../../../../../shared/services/public.service';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AlertsService } from 'src/app/core/services/alerts/alerts.service';
import { ProfileService } from '../../../../services/profile.service';
import { patterns } from 'src/app/shared/configs/patternValidations';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/pages/services/home.service';
import { Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-edit-certification',
  templateUrl: './add-edit-certification.component.html',
  styleUrls: ['./add-edit-certification.component.scss']
})
export class AddEditCertificationComponent implements OnInit {
  private unsubscribe: Subscription[] = [];

  userProfileDetails: any;
  isLoading: boolean = false;
  modalData: any;
  type: any;

  isSelectStartDate: boolean = false;
  minEndDate: any;

  profileForm = this.fb?.group(
    {
      certificationTitle: [
        '',
        {
          validators: [
            Validators.required,
            Validators?.minLength(3),
          ],
          updateOn: 'blur',
        },
      ],
      providerName: [
        '',
        {
          validators: [
            Validators.required,
            Validators?.minLength(3),
          ],
          updateOn: 'blur',
        },
      ],
      providerWebsite: [
        '',
        {
          validators: [
            Validators.required,
            Validators?.pattern(patterns?.url),
          ],
          updateOn: 'blur',
        },
      ],
      credentials: [
        '',
        {
          validators: [
            Validators.required,
            Validators?.pattern(patterns?.url),
          ],
          updateOn: 'blur',
        },
      ],
      description: [
        null,
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
      state: [null, []]
    }
  );
  get formControls(): any {
    return this.profileForm?.controls;
  }
  constructor(
    private checkValidityService: CheckValidityService,
    private profileService: ProfileService,
    private alertsService: AlertsService,
    private config: DynamicDialogConfig,
    public publicService: PublicService,
    private homeService: HomeService,
    private cdr: ChangeDetectorRef,
    private ref: DynamicDialogRef,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.modalData = this.config?.data;
    this.type = this.modalData?.type;
    if (this.type == 'edit') {
      this.getProfileDetails();
    }
  }

  getProfileDetails() {
    this.isLoading = true;
    this.homeService.getProfileDetails().subscribe((res: any) => {
      if (res) {
        this.userProfileDetails = res.data.user;
        this.patchValue();
        this.isLoading = false;
      } else {
        this.isLoading = false;
      }
    })
  }
  patchValue(): void {
    let endDate: any = new Date(this.userProfileDetails?.certificates[0]?.expiration_date);
    let startDate: any = new Date(this.userProfileDetails?.certificates[0]?.obtain_date);
    let state: any = this.userProfileDetails?.certificates[0]?.state == 1 ? true : false;
    this.profileForm?.patchValue({
      certificationTitle: this.userProfileDetails?.certificates[0]?.certification_title,
      providerName: this.userProfileDetails?.certificates[0]?.provider_name,
      providerWebsite: this.userProfileDetails?.certificates[0]?.provider_website,
      credentials: this.userProfileDetails?.certificates[0]?.credentials,
      description: this.userProfileDetails?.certificates[0]?.certification_description,
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
        certification_title: formInfo?.certificationTitle,
        provider_name: formInfo?.providerName,
        provider_website: formInfo?.providerWebsite,
        credentials: formInfo?.credentials,
        certification_description: formInfo?.description,
        obtain_date: formInfo?.startDate,
        expiration_date: formInfo?.endDate,
        state: formInfo?.state == true ? 1 : 0
      };
      this.profileService?.addEditCertification(data)?.subscribe(
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
    this.profileService?.deleteCertification(this.userProfileDetails?.certificates[0]?._id)?.subscribe(
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
