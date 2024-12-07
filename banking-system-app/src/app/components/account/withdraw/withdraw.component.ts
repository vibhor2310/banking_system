import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../../service/account.service';
import { NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-withdraw',
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './withdraw.component.html',
  styleUrl: './withdraw.component.css'
})
export class WithdrawComponent implements OnInit{

  successMsg: string | undefined;
  errorMsg: string | undefined; 
  withdrawForm:FormGroup;
  accounts:any;
  aid:any;
  accountNumber:any;
  balance:any;

  constructor(private accountService:AccountService,private actRoute:ActivatedRoute){
    this.getAccountDetailsById();

    this.withdrawForm=new FormGroup({
      amount: new FormControl('',[Validators.required,Validators.min(1)]),

    })
    // console.log(this.balance);
    // console.log(this.withdrawForm.value.amount);
    
   
    
  }
  ngOnInit(): void {
   this.getAccountDetailsById();
  }

  onFormSubmit(){
    let obj={
      accountNumber:this.accounts.accountNumber,
      amount:this.withdrawForm.value.amount
    }

    this.accountService.withdrawMoney(obj).subscribe({
      next:(data)=>{
        this.successMsg="Money withdrawn!!";
        this.withdrawForm.value.amount = undefined;

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
        //  console.log(this.accounts.balance);
        this.balance = this.accounts.balance;
        // console.log(this.balance);

        this.withdrawForm.controls['amount']
        .setValidators([ Validators.required, Validators.min(1), Validators.max(this.balance) ]);
        
         
        },
        error:(err)=>{}
      })
      
      
    })
    
  }

}
