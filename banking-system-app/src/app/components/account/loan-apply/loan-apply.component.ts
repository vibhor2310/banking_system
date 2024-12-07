import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../../service/account.service';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-loan-apply',
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './loan-apply.component.html',
  styleUrl: './loan-apply.component.css'
})
export class LoanApplyComponent implements OnInit{
  successMsg: string | undefined; 
  errorMsg: string | undefined;
  loanForm:FormGroup;
  aid:any;

  constructor(private accountService:AccountService,private actRoute:ActivatedRoute){
    this.loanForm = new FormGroup({
      loanType:new FormControl('',[Validators.required]),
      amount:new FormControl('',[Validators.required,Validators.min(1)]),
      purpose:new FormControl('',[Validators.required])
    })
  }
  ngOnInit(): void {
    this.actRoute?.parent?.paramMap.subscribe(p=>{
      this.aid = p.get('id');
      // console.log(this.aid);
      
    })
  }

  onFormSubmit(){
    // console.log(this.loanForm.value);
    
    this.accountService.applyForLoan(this.loanForm.value,this.aid).subscribe({
      next:(data)=>{
        this.successMsg = "Thank You for loan application , Please check the status in loan details section";
        this.errorMsg = undefined;
       this.loanForm.value.loanType = undefined;
       this.loanForm.value.amount = undefined;
       this.loanForm.value.purpose = undefined;
      },
      error:(err)=>{
        this.errorMsg = "Unable to do at this time , Please try again after some time";
      }
    })
    
  }



}
