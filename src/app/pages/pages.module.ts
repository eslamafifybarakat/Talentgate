import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { CoreModule } from '../core/core.module';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { HomeComponent } from './components/home/home.component';
import { ApplyJobComponent } from './components/apply-job/apply-job.component';
import { CalenderComponent } from './components/calender/calender.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ApplyJobStepperComponent } from './components/apply-job/components/apply-job-stepper/apply-job-stepper.component';
import { EditProfileModalComponent } from './components/profile/components/edit-profile-modal/edit-profile-modal.component';
import { EditExperienceComponent } from './components/profile/components/edit-experience/edit-experience.component';
import { EditEducationComponent } from './components/profile/components/edit-education/edit-education.component';
import { EditCertificationComponent } from './components/profile/components/edit-certification/edit-certification.component';
import { EditLanguageComponent } from './components/profile/components/edit-language/edit-language.component';

@NgModule({
  declarations: [
    PagesComponent,
    OnboardingComponent,
    HomeComponent,
    ApplyJobComponent,
    CalenderComponent,
    ProfileComponent,
    ApplyJobStepperComponent,
    EditProfileModalComponent,
    EditExperienceComponent,
    EditEducationComponent,
    EditCertificationComponent,
    EditLanguageComponent
  ],
  imports: [
    ReactiveFormsModule,
    PagesRoutingModule,
    AgmCoreModule,
    CommonModule,
    SharedModule,
    FormsModule,
    CoreModule
  ]

  , exports: [
    PagesComponent,
    OnboardingComponent
  ]
})
export class PagesModule { }
