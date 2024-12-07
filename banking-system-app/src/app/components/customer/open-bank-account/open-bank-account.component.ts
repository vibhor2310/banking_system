import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerService } from '../../../service/customer.service';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-open-bank-account',
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './open-bank-account.component.html',
  styleUrl: './open-bank-account.component.css'
})
export class OpenBankAccountComponent implements OnInit{


  // accountForm: FormGroup;
  //  successMsg: string | undefined;
  //   errorMsg: string | undefined;
  //    customerId: number=0;
  successMsg: string | undefined;
  errorMsg: string | undefined; 
  accountForm:FormGroup;
  cid:any;
  aid:any;
  file: any; 
  msg:any|undefined;

  constructor(private customerService:CustomerService,private router:Router){
    this.accountForm = new FormGroup({
      accountType:new FormControl('',[Validators.required]),
      balance: new FormControl({ value: 5000, disabled: true }),
      aadharNumber:new FormControl('',[Validators.required,Validators.pattern(/^[2-9]{1}[0-9]{11}$/)]),
      panNumber:new FormControl('',[Validators.required,Validators.pattern(/[A-Z]{5}[0-9]{4}[A-Z]{1}/)])
    })
    
  }

  ngOnInit(): void {
  
    this.customerService.getCustomerDetails(localStorage.getItem('username')).subscribe({
      next:(data)=>{
        this.cid=data.id;
      },
      error:(err)=>{

      }
    })

  }

  onFormSubmit(){
    this.customerService.openAccount(this.cid,this.accountForm.value).subscribe({
      next:(data)=>{
        this.successMsg = "Thank You !!";
        this.errorMsg = undefined;

        this.router.navigateByUrl("/customer/accounts");
      },
      error:(err)=>{
        this.errorMsg= err.error.msg;
      }
    })

  }


 


}


// let formData = new FormData();
// formData.set('file', this.file);
// this.customerService.uploadImage(formData,this.cid).subscribe({
//   next:(data)=>{
//     this.msg = "Doc uploaded";
//   },
//   error:()=>{}
// })
