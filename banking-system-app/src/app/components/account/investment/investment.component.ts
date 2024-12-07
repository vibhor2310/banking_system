import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-investment',
  imports: [NgIf,NgFor,ReactiveFormsModule,RouterLink,RouterOutlet],
  templateUrl: './investment.component.html',
  styleUrl: './investment.component.css'
})
export class InvestmentComponent {
  successMsg:string|undefined;
  errorMsg:string|undefined;
  investmentForm:FormGroup;

  constructor(){
    this.investmentForm = new FormGroup({
      investmentType:new FormControl('')

    })
  }

  onFormSubmit(){

  }
  onInvestmentTypeChange(){

  }

  investmentTypes =["FD","MutualFund","Stocks","Bonds"]

}
