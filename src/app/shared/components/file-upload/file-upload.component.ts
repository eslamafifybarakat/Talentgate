import { AuthUserService } from './../../../auth/services/auth-user.service';
import { Component, OnInit } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {



  ngOnInit(): void {
  }

  onFileChange(pFileList: any) {
    // this.files = Object.keys(pFileList).map((key: any) => pFileList[key]);
    console.log(pFileList)
  }
  constructor(private _auth: AuthUserService) { }

  handleUpload(event: any) {
    // Handle file upload event
    console.log(event.files);
  }

  // uploadImage() {
  //   const fileUpload: FileUpload = ;
  //   if (fileUpload && fileUpload.files.length > 0) {
  //     const file = fileUpload.files[0];

  //     this._auth.uploadImage(file)
  //       .then(response => {
  //         // Handle successful upload response
  //         console.log(response);
  //       })
  //       .catch(error => {
  //         // Handle upload error
  //         console.error(error);
  //       });
  //   }
  // }

}
