import { CustomerService } from './../../../service/customer.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AccountService } from '../../../service/account.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-transfer',
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './transfer.component.html',
  styleUrl: './transfer.component.css'
})
export class TransferComponent implements OnInit{

  
  successMsg: string | undefined;
  errorMsg: string | undefined; 
  transferForm:FormGroup;
  customer:any|undefined;
  aid:any;
  accounts:any;
  senderAccountNumber:any;
  msg:any;
  isReceiverAccountValid: boolean = false;

  constructor(private accountService:AccountService,private actRoute: ActivatedRoute,private customerService:CustomerService){
    this.transferForm=new FormGroup({
     receiverAccountNumber: new FormControl('',[Validators.required]),
      amount: new FormControl('',[Validators.required,Validators.min(1)])
    },{ validators: this.accountValidator() })
    // this.getAccountDetailsById();
    // this.verify();
   
    
  }
  ngOnInit(): void {
    // this.getAccountDetailsById();
  }

  onFormSubmit(){
    // if (this.transferForm.valid && this.isReceiverAccountValid) 
      // { 
        let obj ={
          senderAccountNumber:this.accounts.accountNumber,
          receiverAccountNumber:this.transferForm.value.receiverAccountNumber,
          amount:this.transferForm.value.amount
        }
        this.accountService.postTransaction(obj).subscribe({
          next:(data)=>{
            this.msg="Transfer Successfull";
            this.customer = undefined;
            this.transferForm.value.receiverAccountNumber = undefined;
            this.transferForm.value.amount = undefined;
          },
          error:(err)=>{


          }
        })
      // }

  }

  verify(){
    // console.log(this.transferForm.value.receiverAccountNumber);
    
    this.senderAccountNumber = this.getAccountDetailsById();
    if(this.senderAccountNumber === this.transferForm.value.receiverAccountNumber){
      this.msg="Cannot transfer to same account";
      this.customer=undefined;
      this.isReceiverAccountValid = false;
    }
    else{
      this.customerService.getCustomerDetailsByAccount(this.transferForm.value.receiverAccountNumber).subscribe({
        next:(data)=>{ 
          this.customer = data;  
          if(this.customer!==null){
          this.isReceiverAccountValid = true;
          }
          this.msg = undefined;
          // console.log(this.customer);
          
        },
        error:(err)=>{
          this.customer = undefined;
          this.isReceiverAccountValid = false;
          this.msg="Invalid Account Number";

  
        }
      })
    }
    this.accountValidator();

   
    

  }

  getAccountDetailsById(){
    this.actRoute.parent?.paramMap.subscribe(p=>{
      this.aid = p.get('id');
      // console.log(this.aid);
      this.accountService.getAccountById(this.aid).subscribe({
        next:(data)=>{
         this.accounts = data;  
         this.senderAccountNumber = this.accounts.accountNumber;
        //  console.log(this.senderAccountNumber);
         
        },
        error:(err)=>{}
      })
      
      
    })
    
  }

  private accountValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const senderAccountNum = this.senderAccountNumber;
      const receiverAccountNumber = control.get('receiverAccountNumber')?.value;
      const amount = control.get('amount')?.value;
      let isValid = true;
      let message = '';
      if(this.isReceiverAccountValid==false){
        isValid=false;
      }
      if (senderAccountNum && receiverAccountNumber && amount) {
        if (receiverAccountNumber === senderAccountNum) {
          isValid = false;
          message = 'Cannot transfer to the same account';
        } 
         else {
          const acct = this.accounts;  
          if (acct.balance < amount) {
            isValid = false;
            message = 'Insufficient balance';
          }
        }
      } else {
        isValid = false;
      }

      return isValid ? null : { transferError: message };
    };
   
    
  }

 


}
