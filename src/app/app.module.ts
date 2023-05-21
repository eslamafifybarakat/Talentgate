import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AsyncPipe } from "../../node_modules/@angular/common";
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { OnlineStatusModule } from 'ngx-online-status';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { DatePipe } from "@angular/common";
import { DialogService } from 'primeng/dynamicdialog';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
  FacebookLoginProvider,
  // LinkedInLoginProvider
} from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    OnlineStatusModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    SocialLoginModule,

  ],
  providers: [
    DatePipe,
    AsyncPipe,
    DialogService,
    {
      provide: "SocialAuthServiceConfig",
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              "625050741021-3fht4vpobaf8gl4ugth1i0u5rv4ndlv3.apps.googleusercontent.com"
            ),
          },
          ,
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider("480854273392442"),
          },
          // {
          //   id: LinkedInLoginProvider.PROVIDER_ID,
          //   provider: new LinkedInLoginProvider("77v591qvhegzkx"),
          // },
        ],
        onError: (err) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],

})
export class AppModule { }
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
