import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { NgModule } from '@angular/core';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { HomeComponent } from './components/home/home.component';
import { ApplyJobComponent } from './components/apply-job/apply-job.component';
import { CalenderComponent } from './components/calender/calender.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {
    path: '', component: PagesComponent, children: [
      {
        path: 'home', component: HomeComponent,
        data: {
          enableHeaderSearch: true,
          type: 'pages',
          title: 'titles.home'
        }
      },
      {
        path: 'apply-job', component: ApplyJobComponent, data: {
          enableHeaderSearch: true,
          enableLocation: true,
          type: 'pages',
          title: 'titles.applyJob'
        }
      },
      {
        path: 'calender', component: CalenderComponent, data: {
          enableHeaderSearch: true,
          type: 'pages',
          title: 'titles.calender'
        }
      },
      {
        path: 'profile', component: ProfileComponent, data: {
          enableHeaderSearch: true,
          type: 'pages',
          title: 'titles.profile'
        }
      },
      {
        path: 'profile/:id', component: ProfileComponent, data: {
          enableHeaderSearch: true,
          type: 'pages',
          title: 'titles.profile'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
