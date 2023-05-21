import { AlertsService } from 'src/app/core/services/alerts/alerts.service';
import { PublicService } from 'src/app/shared/services/public.service';
import { AuthUserService } from './../../auth/services/auth-user.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TranslationService } from './../../shared/services/i18n/translation.service';
@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss']
})
export class OnboardingComponent implements OnInit {
  uploadedFiles: any[] = [];
  cvFileName: any;
  cvFilePath: any;

  constructor(
    public translationService: TranslationService,
    public authUserService: AuthUserService,
    private messageService: MessageService,
    public alertsService: AlertsService,
    public publicService: PublicService,
    private cdr: ChangeDetectorRef,
  ) {

  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  selectFile(event: any): void {
    this.cvFileName = event?.target?.files[0]?.name;
    console.log(event?.target?.files[0]);

    let fileReader = new FileReader();
    fileReader.readAsDataURL(event?.target?.files[0]);
    fileReader.onload = this._handleReaderLoaded.bind(this);

  }
  _handleReaderLoaded(e: any): void {
    var reader = e.target;
    let formData = new FormData();
    let file = this.publicService?.base64ToImageFile(reader.result, "file");
    formData.append("name_cv", file);
    this.authUserService?.uploadcv(formData)?.subscribe(
      (res: any) => {
        if (res?.code == 200) {
          this.cvFilePath = res?.data?.file_Path;
        } else {
          res?.message ? this.alertsService?.openSweetAlert('info', res?.message) : '';
        }
      },
      (err: any) => {
        err?.message ? this.alertsService?.openSweetAlert('error', err?.message) : '';
      });
    this.cdr?.detectChanges();
  }
  onUpload(event: { files: any; }) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: '' });
  }
}
