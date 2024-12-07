import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CustomerService } from '../../../service/customer.service';

@Component({
  selector: 'app-accounts',
  imports: [RouterLink,NgFor],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent {

  accounts:any[]=[];

  constructor(private router:Router,private customerService:CustomerService){
    this.customerService.getAccountsByUsername(localStorage.getItem('username')).subscribe({
      next:(data)=>{
        this.accounts = data;

      },
      error:(err)=>{

      }
    })
    
   }

  // accounts = [ 
  //   { accountNumber: 'ACC1234567890', 
  //     accountType: 'Savings', 
  //     balance: 25000, 
  //     status: 'Active'
  //    },
  //   { 
  //     accountNumber: 'ACC0987654321', 
  //     accountType: 'Current', 
  //     balance: 50000, 
  //     status: 'Inactive' 
  //   } 
  //  ];

   goToAccountDashboard(status:any,accountId:any){
    if(status ==='Active'){
        this.router.navigateByUrl("/account/"+accountId);
    }
    else{
       this.router.navigateByUrl("/customer/doc-upload");
    }  
   }

}
