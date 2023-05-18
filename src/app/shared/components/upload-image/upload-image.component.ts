import { FormControl, FormBuilder } from '@angular/forms';
import { FileUpload } from 'primeng/fileupload';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {
  @Input() multiple: boolean = false;
  @Input() maxFileSize: any = 1000000;
  // @Input() uploadText: string = this.publicService?.translateTextFromJson('general.Upload');
  @Input() acceptFille: any = 'image/*';
  @Input() type: any = '';
  @Input() enablePreview: boolean = false;
  @Input() isEdit: boolean = false;
  @Input() showFile: boolean = false;
  @Input() isEditImage: string = '';
  @Input() maximumSize: any = '10 kb';

  @Output() filesHandler: EventEmitter<any> = new EventEmitter();

    isLoadingImage: boolean = false;

  showCancel: boolean = false;
    uploadedFiles: any = [];

  fileSrc: any;
  fileName: any;
  hasError: boolean = false;
  urlFiles: any;
  constructor(
    // private publicService: PublicService,
    // public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    if (this.isEdit) {
      this.showFile = true;
      console.log(this.uploadedFiles);
    }
  }
  onSelectEvent(event?: any): void {
    this.uploadedFiles = event?.currentFiles;
    this.fileName = event?.currentFiles[0].name
    // this.upload();
    this.filesHandler?.emit({ files: this.uploadedFiles });
    // this.showCancel = true;
    this.showFile = true;
    this.isLoadingImage = true;
    this.hasError = false;
    if (this.uploadedFiles?.length == 0) {
      this.showFile = false;
      this.hasError = true;
    }
    console.log(event.currentFiles);
    for (let file of this.uploadedFiles) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event: any) => {
        this.urlFiles?.push(event?.target?.result)
      }
    }
    console.log(this.urlFiles);

  }

  browse(): void {
    // this.dialog.open(BrowseImageOrVideoComponent, {
    //   width: "40%",
    //   data: { src: this.isEdit ? this.isEditImage : this.fileSrc, type: this.type }
    // });

    // this.dialogService.open(BrowseImageOrVideoComponent, {
    //   // header: 'Choose a Product',
    //   width: '70%',
    //   contentStyle: { "overflow": "auto", "padding": 0 },
    //   dismissableMask:true,
    //     maximizable:true,
    // });
  }

  removeItem(event: any): void {
    console.log(event.file);
    this.uploadedFiles?.forEach((file: any, index: any) => {
      if (file == event?.file) {
        this.uploadedFiles?.splice(index, 1);
      }
      console.log(this.uploadedFiles);
    });
    this.filesHandler?.emit({ files: this.uploadedFiles })
  }

  clearItems(event: any): void {
    this.filesHandler?.emit({ files: null });
    this.showCancel = false;
    this.showFile = false;
  }
  removeFile(f: File) {
    // const index = uploader.files.indexOf(file);
    // uploader.remove(null, index);
    // this.uploadedFiles?.splice()
    console.log(f);
    this.uploadedFiles?.forEach((file: any, index: any) => {
      if (f == file) {
        this.uploadedFiles?.splice(index, 1);
      }
      console.log(this.uploadedFiles);
    });
    // console.log(file);
  }

}

