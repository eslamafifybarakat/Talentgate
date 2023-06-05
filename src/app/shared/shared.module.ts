import { FullCalendarModule } from '@fullcalendar/angular';
import { LanguageSelectorComponent } from './components/header/components/language-selector/language-selector.component';
import { UserInfoComponent } from './components/header/components/user-info/user-info.component';
import { OverlayLoadingComponent } from './components/overlay-spinner/overlay-loading.component';

import { ConfirmDeleteComponent } from './components/confirm-delete/confirm-delete.component';
import { UploadButtonComponent } from './components/upload-button/upload-button.component';
import { ThemeComponent } from './components/header/components/theme/theme.component';
import { UploadImageComponent } from './components/upload-image/upload-image.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { CountdownComponent } from './components/countdown/countdown.component';
import { AngMaterialModule } from './modules/ang-material/ang-material.module';
import { AvatarComponent } from './components/avatar/avatar.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './components/search/search.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from './modules/prime-ng/prime-ng.module';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClickOutsideModule } from 'ng-click-outside';
import { NotificationComponent } from './components/header/components/notification/notification.component';
import { SkeletonComponent } from './components/skeleton/skeleton.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { SchedulerModule } from '@progress/kendo-angular-scheduler';

const allSharedComponents = [
  LanguageSelectorComponent,
  OverlayLoadingComponent,
  ConfirmDeleteComponent,
  UploadButtonComponent,
  UploadImageComponent,
  FileUploadComponent,
  CountdownComponent,
  SkeletonComponent,
  UserInfoComponent,
  HeaderComponent,
  FooterComponent,
  AvatarComponent,
  SearchComponent,
  ThemeComponent
]
const allSharedModule = [
  FullCalendarModule,
  NgxIntlTelInputModule,
  BsDropdownModule,
  SchedulerModule,
  ReactiveFormsModule,
  NgxStarRatingModule,
  ClickOutsideModule,
  AngMaterialModule,
  TranslateModule,
  PrimeNgModule,
  FormsModule,
  NgbModule
]

@NgModule({
  declarations: [
    ...allSharedComponents,
    HeaderComponent,
    FooterComponent,
    NotificationComponent,
  ],
  imports: [
    CommonModule,
    ...allSharedModule
  ],
  exports: [
    ...allSharedComponents,
    ...allSharedModule
  ]
})
export class SharedModule { }
