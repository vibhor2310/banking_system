import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../service/account.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transaction-history',
  imports: [NgFor,NgIf],
  templateUrl: './transaction-history.component.html',
  styleUrl: './transaction-history.component.css'
})
export class TransactionHistoryComponent implements OnInit{

  errorMsg:string|undefined;
  transactions:any[]=[];
  aid:any
  page:number=0;
  size:number=10;
  totalElements: number = 0;
  pageArray:any[] =[];

  constructor(private accountService:AccountService,private actRoute:ActivatedRoute){
    this.getTransactionHistory();

    
 
  }
  ngOnInit(): void {
   
 
  }

  getTransactionHistory(){
    this.actRoute.parent?.paramMap.subscribe(p=>{
      this.aid = p.get('id');
      // console.log(this.aid);
      this.accountService.getTransactionHistory(this.aid,this.page,this.size).subscribe({
        next:(data)=>{
          this.transactions= data.content;
          // console.log(this.transactions);
          
           // for that  one to one page clicking apart from that next and prev thing
        this.totalElements = data.totalElements;
        let totalPages = this.totalElements / this.size;
        let i=1; 
        this.pageArray = [];
        while(totalPages > 0){
          this.pageArray.push(i)
          totalPages = totalPages - 1;
          i++;
        }
        // console.log(this.pageArray)
        },
        error:(err)=>{
          this.errorMsg = "Unable to show at this time , please try after some time"
        }
      })
      
    })
      
  }


  next(){
    this.page = this.page+1;
    this.getTransactionHistory();

  }
  prev(){
    if(this.page>0){
      this.page = this.page-1;
      this.getTransactionHistory();
    }

  }

  onClick(i:number){
    this.page = i
    this.getTransactionHistory();
 }



  

}


// transactions = [
//   { date: '2024-11-26', 
//     accountNumber: 'ACC1234567890', 
//     transactionType: 'Deposit', 
//     amount: 5000 
//   }, 
//   { 
//     date: '2024-11-26', 
//     accountNumber: 'ACC1234567890', 
//     transactionType: 'Withdrawal', 
//     amount: 2000 
//   },
//   { 
//     date: '2024-11-26', 
//     accountNumber: 'ACC1234565540', 
//     transactionType: 'TRANSFER', 
//     amount: 2000 
//   },
//   { 
//     date: '2024-11-26', 
//     accountNumber: 'ACC1234567890', 
//     transactionType: 'Withdrawal', 
//     amount: 2000 
//   },
//   { 
//     date: '2024-11-26', 
//     accountNumber: 'ACC1234567890', 
//     transactionType: 'DEPOSIT', 
//     amount: 2000 
//   }    
// ]
