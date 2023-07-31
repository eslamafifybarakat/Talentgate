import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AlertsService } from 'src/app/core/services/alerts/alerts.service';
import { ProfileService } from 'src/app/pages/services/profile.service';
import { PublicService } from 'src/app/shared/services/public.service';
import { HomeService } from 'src/app/pages/services/home.service';
import { AssessComponent } from '../assess/assess.component';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-all-skills',
  templateUrl: './all-skills.component.html',
  styleUrls: ['./all-skills.component.scss']
})
export class AllSkillsComponent implements OnInit {
  private unsubscribe: Subscription[] = [];

  type: any;
  data: any;
  isLoading: boolean = false;
  userProfileDetails: any;
  detailsSkills: any
  skills: any;
  imgSrc: string = 'https://dev-api.talentsgates.website/getimage/';
  companyName: any;

  constructor(
    private profileService: ProfileService,
    private alertsService: AlertsService,
    private publicService: PublicService,
    private dialogService: DialogService,
    private homeService: HomeService,
    private ref: DynamicDialogRef,
  ) { }

  ngOnInit(): void {
    this.getProfileDetails()
  }

  getProfileDetails() {
    this.isLoading = true;
    this.homeService.getProfileDetails().subscribe((res) => {
      if (res) {
        this.userProfileDetails = res?.data?.user;
        this.companyName = this.userProfileDetails?.company_name;
        this.skills = this.userProfileDetails.skills;
        console.log(this.skills)
        this.isLoading = false;
      } else {
        res?.message ? this.alertsService?.openSweetAlert('info', res?.message) : '';
        this.isLoading = false;
      }
    },
      (err: any) => {
        err?.message ? this.alertsService?.openSweetAlert('error', err?.message) : '';
        this.isLoading = false;
      });
    // this.homeService.getProfileDetails().subscribe((res) => {
    //   console.log(res)
    //   this.userProfileDetails = res.data.user;
    // })
  }

  assess(id: number, type: any) {
    this.profileService.canAccess(id).subscribe((res) => {
      if (res?.status == 200) {
        const ref = this.dialogService.open(AssessComponent, {
          header: type,
          width: '30%',
          data: { id: id },
          styleClass: 'apply-job-dialog',
        });
        ref.onClose.subscribe((res: any) => {
          if (res?.listChanged) {
            this.ref?.close();
          }
        });
      } else {
        res?.message ? this.alertsService?.openSweetAlert('info', res?.message) : '';
      }
    },
      (err: any) => {
        err?.message ? this.alertsService?.openSweetAlert('error', err?.message) : '';
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe?.forEach((sb) => sb?.unsubscribe());
  }
}
