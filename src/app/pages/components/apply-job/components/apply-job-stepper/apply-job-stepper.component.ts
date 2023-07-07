import { PublicService } from './../../../../../shared/services/public.service';
import { patterns } from 'src/app/shared/configs/patternValidations';
import { Validators, FormBuilder } from '@angular/forms';
import { environment } from './../../../../../../environments/environment';
import { HomeService } from 'src/app/pages/services/home.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-apply-job-stepper',
  templateUrl: './apply-job-stepper.component.html',
  styleUrls: ['./apply-job-stepper.component.scss']
})
export class ApplyJobStepperComponent implements OnInit {
  userProfileDetails: any
  imgPath: any = environment?.imgPath;
  currentStep: any;
  firstRegisterForm = this.fb?.group(
    {
      username: [
        '',
        {
          validators: [
            Validators.required,
            Validators.pattern(patterns?.userName),
            Validators?.minLength(3),
          ],
          updateOn: 'blur',
        },
      ],
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
      ]
    }
  );
  get firstFormControls(): any {
    return this.firstRegisterForm?.controls;
  }
  constructor(
    public publicService: PublicService,
    private homeService: HomeService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.currentStep = 0;
    this.getProfileDetails();
  }
  getProfileDetails() {
    this.homeService.getProfileDetails().subscribe((res: any) => {
      console.log(res)
      this.userProfileDetails = res.data.user;
    })
  }
  next(currentStep: any): void {
    if (currentStep == 0) {
      currentStep = 1;
    }
  }
}
