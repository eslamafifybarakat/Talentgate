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
import { AddEditExperienceComponent } from './components/profile/components/add-edit-experience/add-edit-experience.component';
import { AddEditEducationComponent } from './components/profile/components/add-edit-education/add-edit-education.component';
import { AddEditCertificationComponent } from './components/profile/components/add-edit-certification/add-edit-certification.component';
import { AddEditLanguageComponent } from './components/profile/components/add-edit-language/add-edit-language.component';
import { AddEditSkillComponent } from './components/profile/components/add-edit-skill/add-edit-skill.component';
import { AllSkillsComponent } from './components/profile/components/all-skills/all-skills.component';
import { AssessComponent } from './components/profile/components/assess/assess.component';

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
    AddEditExperienceComponent,
    AddEditEducationComponent,
    AddEditCertificationComponent,
    AddEditLanguageComponent,
    AddEditSkillComponent,
    AllSkillsComponent,
    AssessComponent
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
