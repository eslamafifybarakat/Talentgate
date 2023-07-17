import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { AlertsService } from 'src/app/core/services/alerts/alerts.service';
import { ProfileService } from 'src/app/pages/services/profile.service';
import { PublicService } from 'src/app/shared/services/public.service';

@Component({
  selector: 'app-add-edit-skill',
  templateUrl: './add-edit-skill.component.html',
  styleUrls: ['./add-edit-skill.component.scss']
})
export class AddEditSkillComponent implements OnInit {

  isLoading: boolean = false;
  isLoadingSkills: boolean = false;
  skills:any;
  data: any;
  skillsForm = this.fb?.group(
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
            Validators?.minLength(3),
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
    return this.skillsForm?.controls;
  }
  constructor(    private cdr: ChangeDetectorRef,
    private ref: DynamicDialogRef,
    private fb: FormBuilder,
    private profileService: ProfileService,
    private alertsService: AlertsService,
    public publicService: PublicService,) { }

  ngOnInit(): void {
    this.getSkills()
  }

  getSkills(): any {
    // this.isLoadingCountry = true;
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
          this.skillsForm?.patchValue({
            skills: arrSkills
          });
        } else {
          res?.message ? this.alertsService?.openSweetAlert('info', res?.message) : '';

        }
      },
      (err: any) => {
        err?.message ? this.alertsService?.openSweetAlert('error', err?.message) : '';
      });
    this.cdr?.detectChanges();
  }

}
