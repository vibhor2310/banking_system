import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../../../../service/account.service';

@Component({
  selector: 'app-bonds',
  imports: [ReactiveFormsModule,NgIf,NgFor],
  templateUrl: './bonds.component.html',
  styleUrl: './bonds.component.css'
})
export class BondsComponent implements OnInit{
  bondsForm: FormGroup
  selectedBond:any;
  successMsg:any|undefined;
  errorMsg:any|undefined;
  totalValue:any;
  aid:any;
  bondTypes = [ 
    {
      type: 'RBI', 
      rate: 0.07, 
      years: 7, 
      faceValue: 100000, 
      fixedAmount: 62000
    }, 
    // Example properties 
    {
      type: 'GOLD', 
      rate: 0.05, 
      years: 8, 
      faceValue: 250000, 
      fixedAmount: 170000 
    }, 
    { 
      type: 'GOVERNMENT', 
      rate: 0.06, 
      years: 10, 
      faceValue: 500000, 
      fixedAmount: 280000 
    } 
  ];

  constructor(private actRoute:ActivatedRoute,private accountService:AccountService){
    this.bondsForm = new FormGroup({
   bondType:new FormControl('',Validators.required)

    })
  }
  ngOnInit(): void {
    this.bondsForm.get('bondType')?.valueChanges.subscribe(bondtype=>{
      this.selectedBond = this.bondTypes.find(b=>b.type === bondtype);
    })
    this.actRoute?.parent?.paramMap.subscribe(p=>{
      this.aid = p.get('id');
      // console.log(this.aid);
      
    })
  }


  onSubmit(){
    let obj = {
      bondType:this.selectedBond.type,
      faceValue:this.selectedBond.faceValue,
      interestRate:this.selectedBond.rate
    }
    this.accountService.applyForBonds(obj,this.aid).subscribe({
      next:(data)=>{
        this.successMsg = "Thanks for buying the "+ this.selectedBond.type+" bond .We will notify you , once the period got over."
      },
      error:(err)=>{
        this.errorMsg = "Please try after some time";
      }
    })
  }



}
