import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { HomeService } from 'src/app/pages/services/home.service';
import { ProfileService } from 'src/app/pages/services/profile.service';

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
  connexion_type:any=[]
  assessForm:FormGroup=new FormGroup({})
  userProfileDetails: any;
  IdCandidate: any;
  companies:any=[]
  get formControls(): any {
    return this.assessForm?.controls;
  }
  constructor(private config: DynamicDialogConfig,private fb:FormBuilder,
    private ProfileService:ProfileService, private homeService: HomeService) {
   }

  ngOnInit(): void {
    this.modalData = this.config?.data;
    this.id = this.modalData?.id;
    console.log(this.modalData )
    this.assessForm = this.fb.group({
      company_name:[''],
      connexion_type:[''],
      rate:[0]
    })
    this.connexion_type=[
      {id:0, name:'college' },
      {id:1, name:'team ' },
      {id:2, name:'manager' },
    ]

    this.homeService.getProfileDetails().subscribe((res)=>{
      console.log(res);
      this.userProfileDetails = res?.data?.user;
      this.IdCandidate= this.userProfileDetails._id;
      console.log("candidate ID",this.IdCandidate );
    });
    this.ProfileService.getAllCompany().subscribe((res)=>{
      console.log(res);
      this.companies=res.data;
    })
  }

  assess()
  {
    this.ProfileService.assess(this.IdCandidate,this.assessForm.value,this.id).subscribe(res=>{
      console.log(res);
    })
  }

}
