import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../service/account.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-card-details',
  imports: [NgFor,NgIf],
  templateUrl: './card-details.component.html',
  styleUrl: './card-details.component.css'
})
export class CardDetailsComponent implements OnInit{
  errorMsg:string|undefined;
  cards:any[]=[];
  aid:any

  constructor(private accountService:AccountService,private actRoute:ActivatedRoute){} 



  ngOnInit(): void {
    this.getCardDetails();
  }



  getCardDetails(){
    this.actRoute.parent?.paramMap.subscribe(p=>{
      this.aid = p.get('id');
      // console.log(this.aid);
      this.accountService.getCardDetails(this.aid).subscribe({
        next:(data)=>{
          this.cards= data;
        },
        error:(err)=>{
          this.errorMsg = "Unable to show at this time , please try after some time"
        }
      })
      
    })
      
  }
 

 


}



// cardDetails = [ 
   
//   { cardNumber: '1234 5678 9012 3456', 
//     cardType: 'DEBIT', 
//     status: 'Active', 
//     expiryDate: '12/25', 
//     cvv: '123', 
//     balance: 5000 
//   }, 
//   { 
//     cardNumber: '9876 5432 1098 7654', 
//     cardType: 'CREDIT', 
//     status: 'Inactive', 
//     expiryDate: '01/24', 
//     cvv: '456', 
//     balance: 10000 
//   } 
// ]
