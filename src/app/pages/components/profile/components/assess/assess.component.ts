import { Subscription } from 'rxjs';
import { PublicService } from 'src/app/shared/services/public.service';
import { CheckValidityService } from './../../../../../shared/services/check-validity/check-validity.service';
import { AlertsService } from './../../../../../core/services/alerts/alerts.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { HomeService } from 'src/app/pages/services/home.service';
import { ProfileService } from 'src/app/pages/services/profile.service';

@Component({
  selector: 'app-assess',
  templateUrl: './assess.component.html',
  styleUrls: ['./assess.component.scss']
})
export class AssessComponent implements OnInit {
  private unsubscribe: Subscription[] = [];

  id: number = 0;
  modalData: any;
  progress: number = 30;
  volume = 50;
  degrees: any = []
  connexion_type: any = []
  assessForm: FormGroup = new FormGroup({})
  userProfileDetails: any;
  IdCandidate: any;
  companies: any = []

  get formControls(): any {
    return this.assessForm?.controls;
  }
  constructor(
    private checkValidityService: CheckValidityService,
    private profileService: ProfileService,
    private alertsService: AlertsService,
    private publicService: PublicService,
    private config: DynamicDialogConfig,
    private homeService: HomeService,
    private ref: DynamicDialogRef,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.modalData = this.config?.data;
    this.id = this.modalData?.id;
    console.log(this.modalData)
    this.assessForm = this.fb.group({
      company_name: [null,
        {
          validators: [
            Validators.required,
          ]
        },],
      connexion_type: [null,
        {
          validators: [
            Validators.required,
          ]
        },],
      rate: [0]
    })
    this.connexion_type = [
      { id: 0, name: 'college' },
      { id: 1, name: 'team ' },
      { id: 2, name: 'manager' },
    ]

    this.homeService.getProfileDetails().subscribe((res) => {
      console.log(res);
      this.userProfileDetails = res?.data?.user;
      this.IdCandidate = this.userProfileDetails._id;
      console.log("candidate ID", this.IdCandidate);
    });
    this.profileService.getAllCompany().subscribe((res) => {
      console.log(res);
      this.companies = res.data;
    })
  }

  assess() {
    console.log(this.assessForm?.value);
    let data: any = {
      connexion_type: this.assessForm?.value?.connexion_type?.id,
      company_name: this.assessForm?.value?.company_name?._id,
      rate: this.assessForm?.value?.rate
    };

    if (this.assessForm?.valid) {
      this.publicService?.show_loader?.next(true);
      this.profileService.assess(this.id, this.IdCandidate, data).subscribe((res) => {
        if (res?.status == 200) {
          this.publicService?.show_loader?.next(false);
          this.ref?.close({ listChanged: true });
        } else {
          res?.message ? this.alertsService?.openSweetAlert('info', res?.message) : '';
          this.publicService?.show_loader?.next(false);
        }
      },
        (err: any) => {
          err?.message ? this.alertsService?.openSweetAlert('error', err?.message) : '';
          this.publicService?.show_loader?.next(false);
        });
    } else {
      this.checkValidityService?.validateAllFormFields(this.assessForm);
    }
  }
  ngOnDestroy(): void {
    this.unsubscribe?.forEach((sb) => sb?.unsubscribe());
  }
}
