import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { NgModule } from '@angular/core';
import { OnboardingComponent } from './onboarding/onboarding.component';

const routes: Routes = [
  {  path: '', component: PagesComponent, children: []},
  { path: 'Onboarding', component: OnboardingComponent, }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {

 }
