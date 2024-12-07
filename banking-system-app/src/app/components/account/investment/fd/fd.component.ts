import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../../../../service/account.service';

@Component({
  selector: 'app-fd',
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './fd.component.html',
  styleUrl: './fd.component.css'
})
export class FdComponent implements OnInit{
  fdForm: FormGroup;
   totalAmount: any|undefined;
   aid:any;
   successMsg:any|undefined;
   errorMsg:any|undefined;
   interestRate:any = 7.5;

   constructor(private actRoute:ActivatedRoute,private accountService:AccountService){
    this.fdForm = new FormGroup({
      amount:new FormControl('',[Validators.required,Validators.min(50000)]),
      years:new FormControl('',[Validators.required,Validators.min(5),Validators.max(50)])

    })
    // this.interestRate = this.calculateInterest(this.fdForm.value.amount,this.fdForm.value.years);
  }
  ngOnInit(): void {
    this.fdForm.valueChanges.subscribe((values) => { 
      this.calculateInterest(values.amount, values.years);
    })
    this.actRoute?.parent?.paramMap.subscribe(p=>{
      this.aid = p.get('id');
      // console.log(this.aid);
      
    })
  }

   onSubmit(){
    let obj = {
      depositAmount:this.fdForm.value.amount,
      years:this.fdForm.value.years
    }
    this.accountService.applyForFD(obj,this.aid).subscribe({
      next:(data)=>{
        this.successMsg = "Thank You fro applying to FD , we will notify you once the maturity date is completed";
        this.fdForm.value.amount = undefined;
        this.fdForm.value.years = undefined;
      },
      error:(err)=>{
        this.errorMsg = "Please try after some time";
      }
    })
   
   }

   calculateInterest(amount: any, years: any) {
    if (amount && years) {
      const principal = amount;
      const rate = this.interestRate / 100; 
      const n = 1;
      const t = years;
  
      this.totalAmount = principal * Math.pow((1 + rate / n), n * t);
    } else {
      this.totalAmount = undefined;
    }
  }
   

}
