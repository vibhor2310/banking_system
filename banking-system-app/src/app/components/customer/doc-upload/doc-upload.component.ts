import { Component } from '@angular/core';
import { CustomerService } from '../../../service/customer.service';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doc-upload',
  imports: [NgIf],
  templateUrl: './doc-upload.component.html',
  styleUrl: './doc-upload.component.css'
})
export class DocUploadComponent {


  cid:any;
  selectedAadharFile:any;
  selectedPanFile:any;
  selectedPhotoFile:any;
  msg1:any|undefined;
  msg2:any|undefined;
  msg3:any|undefined;
  isPan:boolean = false;
  isAadhar:boolean = false;
  isPhoto:boolean = false;


  constructor(private customerService:CustomerService,private router:Router){

    this.customerService.getCustomerDetails(localStorage.getItem('username')).subscribe({
      next:(data)=>{
        this.cid=data.id;
        // console.log(this.cid);
        
      },
      error:(err)=>{

      }
    })

  }

  onFileSelect(event:any,type:any){
    const file = event.target.files[0]; 
    if (type === 'aadhar') 
      { this.selectedAadharFile = file; 

      }
    else if (type === 'pan') 
    { 
      this.selectedPanFile = file; 

    }
    else if(type === 'photo'){
      this.selectedPhotoFile = file;
    }
  }
  uploadFileAadhar(){
    let formData = new FormData(); 
    formData.set('file', this.selectedAadharFile);
    this.customerService.uploadImageAadhar(formData,this.cid).subscribe({
        next:(data)=>{
          this.isAadhar = true;
          this.msg1 = "Doc uploaded";
          this.msg2 = undefined;
          this.msg3 = undefined;
        },
        error:()=>{}
      })

  }

  uploadFilePan(){
    let formData = new FormData(); 
    formData.set('file',this.selectedPanFile);
    this.customerService.uploadImagePan(formData,this.cid).subscribe({
        next:(data)=>{
          this.isPan=true;
          this.msg2 = "Doc uploaded";
          this.msg1= undefined;
          this.msg3 = undefined;
        },
        error:()=>{}
      })


  }

  uploadFilePhoto() {
    let formData = new FormData(); 
    formData.set('file',this.selectedPhotoFile);
    this.customerService.uploadImagePhoto(formData,this.cid).subscribe({
        next:(data)=>{
          this.isPhoto = true;
          this.msg3 = "Doc uploaded";
          this.msg1= undefined;
          this.msg2 = undefined;
        },
        error:()=>{}
      })
    }

  navigateToOpenAccount(){
    // if(this.selectedAadharFile&&this.selectedPanFile&&this.selectedPhotoFile){
    this.router.navigateByUrl("/customer/open-bank-account")
    // }
  }

}
