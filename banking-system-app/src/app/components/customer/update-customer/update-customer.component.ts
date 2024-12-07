import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerService } from '../../../service/customer.service';

@Component({
  selector: 'app-update-customer',
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './update-customer.component.html',
  styleUrl: './update-customer.component.css'
})
export class UpdateCustomerComponent implements OnInit{

  successMsg: string | undefined;
  errorMsg: string | undefined; 
  customerForm:FormGroup;
  customer:any;

  constructor(private customerService:CustomerService){
    this.customerForm = new FormGroup({
      firstName: new FormControl('',[Validators.required]),
      lastName: new FormControl('',[Validators.required]),
      dateOfBirth: new FormControl('',[Validators.required]),
      contactNumber: new FormControl('',[Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      address: new FormControl('',[Validators.required]),
    })
    
  }

  ngOnInit(): void {

    this.customerService.getCustomerDetails(localStorage.getItem('username')).subscribe({
      next:(data)=>{
        this.customer = data;
        this.customerForm = new FormGroup({
          firstName: new FormControl(this.customer.firstName,[Validators.required]),
          lastName: new FormControl(this.customer.lastName,[Validators.required]),
          dateOfBirth: new FormControl(this.customer.dateOfBirth,[Validators.required]),
          contactNumber: new FormControl(this.customer.contactNumber,[Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
          address: new FormControl(this.customer.address,[Validators.required]),
        })
      },
      error:(err)=>{
        this.errorMsg = "Some error occured please retry after some time";
      }
    })

  }

  onFormSubmit(){
    console.log(this.customer);
    
    this.customer.firstName = this.customerForm.value.firstName;
    this.customer.lastName = this.customerForm.value.lastName;
    this.customer.dateOfBirth  = this.customerForm.value.dateOfBirth;
    this.customer.contactNumber  = this.customerForm.value.contactNumber;
    this.customer.address  = this.customerForm.value.address;
  console.log(this.customer);
  
    this.customerService.updateCustomerDetails(this.customer,localStorage.getItem('username')).subscribe({
      next:(data)=>{
        this.customer = data;
 
        this.successMsg = "Profile Updated ..."
      },
      error:(err)=>{
        this.errorMsg="Please try after some time";
      }
    })


  }
}
