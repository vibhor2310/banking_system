import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { CustomerService } from '../../../service/customer.service';

@Component({
  selector: 'app-customer-details',
  imports: [NgFor],
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.css'
})
export class CustomerDetailsComponent {
  customers: any[]=[];

  
  constructor(private customerService:CustomerService){
    this.customerService.getCustomerDetails(localStorage.getItem('username')).subscribe({
      next:(data)=>{
        this.customers=[data];
      },
      error:(err)=>{
        
      }
    })

  }
    


}


/*


*/

  // customers = [
  //   {
  //     firstName: 'Vibhor',
  //     lastName: 'Sharma',
  //     dateOfBirth: '23-10-2003',
  //     gender: 'Male',
  //     contactNumber: '1234567890',
  //     address: 'Uttrakhand',
  //     aadharNumber: '123412341234',
  //     panNumber: 'ABCDE1234F',
  //     createdAt: '2023-11-26',
  //     status: 'Active',
  //     email: 'vibhor12@.com'
  //   }
  // ]
