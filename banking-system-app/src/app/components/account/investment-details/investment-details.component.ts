import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../../../service/account.service';

@Component({
  selector: 'app-investment-details',
  imports: [ReactiveFormsModule,NgIf,NgFor],
  templateUrl: './investment-details.component.html',
  styleUrl: './investment-details.component.css'
})
export class InvestmentDetailsComponent implements OnInit{
  investmentForm:FormGroup
  type:any;
  aid:any;
  investments: any = { }

  constructor(private actRoute:ActivatedRoute,private accountService:AccountService){
    this.investmentForm = new FormGroup({
      investmentType:new FormControl('',[Validators.required])

    })
  }
  ngOnInit(): void {
    this.actRoute?.parent?.paramMap.subscribe(p=>{
      this.aid = p.get('id');
      // console.log(this.aid);
      
    })
  }
 
  investmentTypes = ['MUTUALFUNDS', 'BONDS', 'FIXEDDEPOSITS'];

  onSubmit(){

    this.type = this.investmentForm.get('investmentType')?.value;
    console.log(this.type);
    
    if(this.type==='FIXEDDEPOSITS'){
    this.accountService.getInvestmentDetailsFD(this.aid,this.type).subscribe({
      next:(data)=>{
        this.investments = data; 
      },
      error:(err)=>{
      }
    })
  }
  else if (this.type === 'BONDS'){
    this.accountService.getInvestmentDetailsBONDS(this.aid,this.type).subscribe({
      next:(data)=>{
        this.investments = data; 
      },
      error:(err)=>{
      }
    })
  }
  else if (this.type === 'MUTUALFUNDS'){
    this.accountService.getInvestmentDetailsMF(this.aid,this.type).subscribe({
      next:(data)=>{
        this.investments = data; 
      },
      error:(err)=>{
      }
    })
  }

  


  }

}
