import { CheckValidityService } from './../../../../../shared/services/check-validity/check-validity.service';
import { AlertsService } from 'src/app/core/services/alerts/alerts.service';
import { ProfileService } from 'src/app/pages/services/profile.service';
import { PublicService } from 'src/app/shared/services/public.service';
import { HomeService } from 'src/app/pages/services/home.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-edit-skill',
  templateUrl: './add-edit-skill.component.html',
  styleUrls: ['./add-edit-skill.component.scss']
})
export class AddEditSkillComponent implements OnInit {
  private unsubscribe: Subscription[] = [];

  userProfileDetails: any;
  isLoading: boolean = false;
  modalData: any;

  type: any;
  id: any;
  data: any;

  isLoadingSkills: boolean = false;
  skills: any = [];
  skillsData: any = [];
  assessments: any = [4, 5, 5, 7];
  totalRecords!: number;
  rows!: number;
  first!: number;
  filteredSkills: any = [];

  skillsForm = this.fb?.group(
    {
      skills: [
        null,
        {
          validators: [
            Validators.required,
          ],
        },
      ],
    }
  );

  get formControls(): any {
    return this.skillsForm?.controls;
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
  ) {
  }

  ngOnInit(): void {
    this.modalData = this.config?.data;
    this.type = this.modalData?.type;
    this.id = this.modalData?.id;
    this.getProfileDetails();
    this.getSkills()
    this.first = 0;
    this.rows = 2;
  }

  getProfileDetails() {
    this.isLoading = true;
    this.homeService?.getProfileDetails()?.subscribe((res: any) => {
      if (res) {
        this.userProfileDetails = res?.data?.user;
        this.userProfileDetails?.skills?.forEach((item: any) => {
          if (item?._id == this.id) {
            this.data = item;
          }
        });
        console.log(this.data);
        let skills: any = { name: this.data?.name };
        this.skillsForm?.patchValue({
          skills: skills
        });
        this.isLoading = false;
      } else {
        this.isLoading = false;
      }
    })
  }

  filterSkills(event: any) {
    let query = event.query;
    this.profileService?.getSkill(query)?.subscribe(
      (res: any) => {
        if (res?.status == 200) {
          let arr: any = [];
          // arr = res?.data ? res?.data : [];
          res?.data ? res?.data?.forEach((item: any) => {
            arr?.push(
              { name: item?.name }
            )
          }) : '';
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

  getSkills(): any {
    this.isLoadingSkills = true;
    this.profileService?.getSkills()?.subscribe(
      (res: any) => {
        if (res?.status == 200) {
          let arr: any = [];
          arr = res?.data ? res?.data : [];
          this.skills = arr;
          // this.skillsData = arr;
          // this.totalRecords = this.skillsData?.length;

          this.isLoadingSkills = false;
          // let arrSkills: any = [];
          // this.skills?.forEach((item: any) => {
          //   this.data?.skills?.forEach((element: any) => {
          //     if (item?._id == element?._id) {
          //       arrSkills?.push(item);
          //     }
          //   });
          // });
          // this.skillsForm?.patchValue({
          //   skills: this.data?.name
          // });
        } else {
          res?.message ? this.alertsService?.openSweetAlert('info', res?.message) : '';
          this.isLoadingSkills = false;
        }
      },
      (err: any) => {
        err?.message ? this.alertsService?.openSweetAlert('error', err?.message) : '';
        this.isLoadingSkills = false;
      });
    this.cdr?.detectChanges();
    this.skillsData = [
      {
        name: 'User Interface Design',
        rate: 5.5,
        allRate: 10,
        assessments: [
          { img: '../../../../../../assets/images/profile/ui.jfif', name: 'Ceilne Ahmed', rate: 5.5, position: 'Team Leader at Google' },
          { img: '../../../../../../assets/images/profile/ltd.png', name: 'John doe', rate: 4.5, position: 'Team Leader at Google' },
          { img: '../../../../../../assets/images/profile/be.jpg', name: 'Mohamed Ali', rate: 9.5, position: 'Team Leader at Google' },
          { img: '../../../../../../assets/images/profile/ui.jfif', name: 'John doe', rate: 7.5, position: 'Team Leader at Google' }
        ]
      },
      {
        name: 'User Interface Design',
        rate: 8.5,
        allRate: 10,
        assessments: [
          { img: '../../../../../../assets/images/profile/ui.jfif', name: 'Nour Ahmed', rate: 3.5, position: 'Team Leader at Google' },
          { img: '../../../../../../assets/images/profile/ltd.png', name: 'John doe', rate: 6.5, position: 'Team Leader at Google' },
          { img: '../../../../../../assets/images/profile/be.jpg', name: 'John doe', rate: 8.5, position: 'Team Leader at Google' },
          { img: '../../../../../../assets/images/profile/ui.jfif', name: 'John doe', rate: 5.5, position: 'Team Leader at Google' }
        ]
      },
      {
        name: 'User Interface',
        rate: 7.5,
        allRate: 10,
        assessments: [
          { img: '../../../../../../assets/images/profile/ui.jfif', name: 'Ali Mohamed', rate: 4.5, position: 'Team Leader at Google' },
          { img: '../../../../../../assets/images/profile/ltd.png', name: 'Mohamed Ali', rate: 9.5, position: 'Team Leader at Google' },
          { img: '../../../../../../assets/images/profile/be.jpg', name: 'Nour Ahmed', rate: 7.5, position: 'Team Leader at Google' },
          { img: '../../../../../../assets/images/profile/ui.jfif', name: 'John doe', rate: 8.5, position: 'Team Leader at Google' }
        ]
      },
      {
        name: 'User Interface Design',
        rate: 8.5,
        allRate: 10,
        assessments: [
          { img: '../../../../../../assets/images/profile/ui.jfif', name: 'John doe', rate: 7, position: 'Team Leader at Google' },
          { img: '../../../../../../assets/images/profile/ltd.png', name: 'John doe', rate: 5, position: 'Team Leader at Google' },
          { img: '../../../../../../assets/images/profile/be.jpg', name: 'John doe', rate: 6.5, position: 'Team Leader at Google' },

        ]
      }
    ];
    this.totalRecords = this.skillsData?.length;
  }
  onPageChange(event: any): void {
    this.first = event?.first;
  }
  submit(): void {
    if (this.skillsForm?.valid) {
      this.publicService?.show_loader?.next(true);
      let formInfo: any = this.skillsForm?.value;
      // let skillsIds: any = [];
      // formInfo?.skills?.forEach((item: any) => {
      //   skillsIds?.push(item?._id);
      // });
      let data = {
        skills: formInfo?.skills?.name ? formInfo?.skills?.name : formInfo?.skills
      };
      this.profileService?.addEditSkill(data, this.id ? this.id : null)?.subscribe(
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
      this.checkValidityService?.validateAllFormFields(this.skillsForm);
    }
    this.cdr?.detectChanges();
  }
  cancel(): void {
    this.ref?.close();
  }
  remove(id?: any): void {
    this.publicService?.show_loader?.next(true);
    this.profileService?.deleteSkills(id)?.subscribe(
      (res: any) => {
        if (res?.status == 200) {
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
