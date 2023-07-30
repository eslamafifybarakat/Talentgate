import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-assess',
  templateUrl: './assess.component.html',
  styleUrls: ['./assess.component.scss']
})
export class AssessComponent implements OnInit {

  id:number=0;
  modalData: any;
  progress: number=30;
  volume = 50;
  degrees:any=[]
  assessForm:FormGroup=new FormGroup({})
  constructor(private config: DynamicDialogConfig,private fb:FormBuilder) {
    setTimeout(() => {
      this.progress = 40;
    }, 2000);
   }

  ngOnInit(): void {
    this.modalData = this.config?.data;
    this.id = this.modalData?.id;
    this.assessForm = this.fb.group({
      company_name:[''],
      connexion_type:[''],
      range:[0]
    })
  }

}
