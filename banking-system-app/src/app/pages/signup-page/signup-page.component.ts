
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-signup-page',
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.css'
})
export class SignupPageComponent implements OnInit{


  successMsg: string | undefined;
  errorMsg: string | undefined; 
  customerForm:FormGroup;

  constructor(private customerService:CustomerService,private router:Router,private authService:AuthService){
    this.customerForm = new FormGroup({
      firstName: new FormControl('',[Validators.required]),
      lastName: new FormControl('',[Validators.required]),
      dateOfBirth: new FormControl('',[Validators.required]),
      gender: new FormControl('',[Validators.required]),
      contactNumber: new FormControl('',[Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      address: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required]),
      username: new FormControl('',[Validators.required,Validators.minLength(4)]),
      password: new FormControl('',[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)]),
      rePassword: new FormControl('',[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)]),
      // role:new FormControl('',[Validators.required])
    })
  }


  ngOnInit(): void {


 }
 resetMsg(){
  this.errorMsg=undefined;
  this.successMsg=undefined;
}

 onFormSubmit() {
  if(this.customerForm.value.password!=this.customerForm.value.rePassword){
    this.errorMsg = "Password do not match, Please try again ...";
    this.successMsg = undefined;
    return ;
  }
  let obj = {

  }
  this.authService.registerCustomer(this.customerForm.value).subscribe({
    next:(data)=>{
      this.successMsg = "Thank You for registering !!!";
      this.errorMsg = undefined;
      this.router.navigateByUrl("/customer");
    },
    error:(err)=>{
      this.errorMsg= err.error.msg;


    }
  })
  }



// this.authService.signUp(this.customerForm.value).subscribe({
//   next:(data)=>{
//     this.customerService.registerCustomer(this.customerForm.value).subscribe({
//   next:(data)=>{
//     this.successMsg = "Thank You for registering !!!";
//     this.errorMsg = undefined;
//     this.router.navigateByUrl("/customer");
//   },
//   error:(err)=>{
//     this.errorMsg= err.error.msg;


//   }
// })
//   },
//   error:(err)=>{
//     this.errorMsg= err.error.msg;
//   }
// })

// this.customerService.registerCustomer(this.customerForm.value).subscribe({
//   next:(data)=>{
//     this.successMsg = "Thank You for registering !!!";
//     this.errorMsg = undefined;
//     this.router.navigateByUrl("/customer");
//   },
//   error:(err)=>{
//     this.errorMsg= err.error.msg;


//   }
// })
}

