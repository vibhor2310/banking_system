import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../../../../service/account.service';

@Component({
  selector: 'app-mutual-funds',
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './mutual-funds.component.html',
  styleUrl: './mutual-funds.component.css'
})
export class MutualFundsComponent implements OnInit{
  mutualFundForm:FormGroup;
  totalPrice:any|undefined;
  unitPrice:number = 150;
  successMsg:any|undefined;
  errorMsg:any|undefined;
  years: number = 5;
  annualInterestRate: number = 0.075;
  aid:any;

  constructor(private actRoute:ActivatedRoute,private accountService:AccountService){
    this.mutualFundForm = new FormGroup({
    
      unitsPurchased:new FormControl('',[Validators.required,Validators.min(1)])

    })
  }
  ngOnInit(): void {
    this.mutualFundForm.valueChanges.subscribe(v=>{
      this.calculateTotalPrice(v.unitsPurchased);
    })
    this.actRoute?.parent?.paramMap.subscribe(p=>{
      this.aid = p.get('id');
      // console.log(this.aid);
      
    })
  }

  onSubmit(){
    let obj = {
      purchasePrice:this.unitPrice,
      unitsPurchased:this.mutualFundForm.value.unitsPurchased,
      totalPrice:this.totalPrice
    }
    this.accountService.applyForMutualFund(obj,this.aid).subscribe({
      next:(data)=>{
        this.successMsg = "Thanks for buying the Hexaware Mutual Fund , we will notify you once the period is over ";
      },
      error:(err)=>{
        this.errorMsg = "Please try again later";
      }
    })

    
    
  }

 calculateTotalPrice(units:any){
  if(units){
    const principal = units * this.unitPrice; 
    this.totalPrice = principal * Math.pow(1 + this.annualInterestRate, this.years);
  }
  else{
    this.totalPrice = undefined;
  }

 }


}
