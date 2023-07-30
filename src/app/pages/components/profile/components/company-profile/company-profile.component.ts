import { AlertsService } from './../../../../../core/services/alerts/alerts.service';
import { PublicService } from './../../../../../shared/services/public.service';
import { ProfileService } from '../../../../../pages/services/profile.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss']
})
export class CompanyProfileComponent implements OnInit {
  private unsubscribe: Subscription[] = [];

  isLoading: boolean = false;
  companyProfileDetails: any;
  id: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private profileService: ProfileService,
    private alertsService: AlertsService,
    private publicService: PublicService,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute?.snapshot?.params['id'];
    this.viewCompanyDetails(this.id);
  }

  viewCompanyDetails(id: any): void {
    this.isLoading = true;
    this.profileService.viewCompanyDetails(id).subscribe((res) => {
      if (res?.status == 200) {
        this.companyProfileDetails = res?.data;
        console.log(this.companyProfileDetails)
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
  }

  ngOnDestroy(): void {
    this.unsubscribe?.forEach((sb) => sb?.unsubscribe());
  }
}
