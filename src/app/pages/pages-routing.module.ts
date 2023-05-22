import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { NgModule } from '@angular/core';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: 'onboarding', component: OnboardingComponent, },
  {
    path: '', component: PagesComponent, children: [
      { path: 'home', component: HomeComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
