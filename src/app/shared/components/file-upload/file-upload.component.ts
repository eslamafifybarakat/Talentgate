import { AuthUserService } from './../../../auth/services/auth-user.service';
import { Component, OnInit } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  selectedFile: File | null = null;
  cvUrl: string | null = null;

  constructor(private authUserService: AuthUserService){}
  ngOnInit(): void {
 
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  uploadCV() {
    if (this.selectedFile) {
    
      const formData = new FormData();
      formData.append('cv', this.selectedFile, this.selectedFile.name);

      this.authUserService.uploadcv('data').subscribe(
     response => {
          console.log('Upload successful:', response);
          this.cvUrl = response.url; // Assuming the API response contains the URL of the uploaded CV
        },
        (error: any) => {
          console.error('Upload failed:', error);
        }
      );
    }
  }
}


