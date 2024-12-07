import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountService } from '../../../service/account.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-deposit',
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './deposit.component.html',
  styleUrl: './deposit.component.css'
})
export class DepositComponent implements OnInit{

  successMsg: string | undefined;
  errorMsg: string | undefined; 
  depositForm:FormGroup;
  accounts:any;
  aid:any;
  accountNumber:any;

  constructor(private accountService:AccountService,private actRoute:ActivatedRoute){
    this.depositForm=new FormGroup({
      amount: new FormControl('',[Validators.required,Validators.min(1)]),

    })
    // this.getAccountDetailsById();
  }
  ngOnInit(): void {
   this.getAccountDetailsById();
  }

  onFormSubmit(){
    let obj={
      accountNumber:this.accounts.accountNumber,
      amount:this.depositForm.value.amount
    }

    this.accountService.depositMoney(obj).subscribe({
      next:(data)=>{
        this.successMsg="Money Deposited !!";
        this.depositForm.value.amount = undefined;

      },
      error:(err)=>{
        this.errorMsg="Some technical error  , Plesse try again ...";

      }
    })




  }

  getAccountDetailsById(){
    this.actRoute.parent?.paramMap.subscribe(p=>{
      this.aid = p.get('id');
      // console.log(this.aid);
      this.accountService.getAccountById(this.aid).subscribe({
        next:(data)=>{
          // console.log(data);
          
         this.accounts = data;  
         this.accountNumber = this.accounts.accountNumber;
        //  console.log(this.accountNumber);
         
        },
        error:(err)=>{}
      })
      
      
    })
    
  }
}
