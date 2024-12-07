// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { FormsModule } from '@angular/forms';
// import { NgIf } from '@angular/common';
// import { CustomerService } from '../../service/customer.service';

// @Component({
//   selector: 'app-details',
//   imports: [FormsModule,NgIf],
//   templateUrl: './details.component.html',
//   styleUrl: './details.component.css'
// })
// export class DetailsComponent {

//   constructor(private customerService:CustomerService,private router:Router) { } // injecting authService , router

//   firstName:string="";
//   lastName:string="";
//   dob:Date | undefined;
//   gender:string="";
//   email:string="";
//   contactNumber:string=""; 
//   address:string="";

//   errorMsg: string | undefined;
//   successMsg: string | undefined;

// //   onSubmit(){
   
// //   //   this.customerService.registerCustomer({
      
// //   //     firstName:this.firstName,
// //   //     lastName:this.lastName,
// //   //     dob:this.dob,
// //   //     gender:this.gender,
// //   //     email:this.email,
// //   //     contactNumber:this.contactNumber,
// //   //     address:this.address
// //   //   }).subscribe({
// //   //     next:(data)=>{
// //   //       this.successMsg="customers detail added";
// //   //       console.log("customers detail added");
// //   //        this.router.navigateByUrl("/customer");
// //   //     },
// //   //     error:(err)=>{
// //   //       this.errorMsg = err.error.msg;
// //   //     }
// //   //   })
// //   // }

 

// // }
// }
