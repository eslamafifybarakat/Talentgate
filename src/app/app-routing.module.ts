import { NoInternetComponent } from './core/componenets/no-internet/no-internet.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout/layout.component';
import { OnboardingComponent } from './pages/onboarding/onboarding.component';

const routes: Routes = [
  // { path: 'layout', loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule) },
  { path: '',  component: OnboardingComponent},
  { path: '',  component: LayoutComponent,
  loadChildren: () => import('./pages/pages.module').then((m) => m.PagesModule),},
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'no-internet', component: NoInternetComponent },
  // {path: '',redirectTo: 'auth', pathMatch: 'full', },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,
      {
        useHash: false,
        scrollPositionRestoration: 'top'
      }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
