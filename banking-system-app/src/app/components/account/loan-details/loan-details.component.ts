import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../service/account.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-loan-details',
  imports: [NgFor,NgIf],
  templateUrl: './loan-details.component.html',
  styleUrl: './loan-details.component.css'
})
export class LoanDetailsComponent implements OnInit{

  errorMsg:string|undefined;
  loans:any[]=[];
  aid:any
  page:number=0;
  size:number=10;
  totalElements: number = 0;
  pageArray:any[] =[];


  constructor(private accountService:AccountService,private actRoute:ActivatedRoute){} 


  ngOnInit(): void {
    this.getLoanDetails();
  }



  getLoanDetails(){
    this.actRoute.parent?.paramMap.subscribe(p=>{
      this.aid = p.get('id');
      // console.log(this.aid);
      this.accountService.getLoanDetails(this.aid,this.page,this.size).subscribe({
        next:(data)=>{
          this.loans= data.content;
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
        },
        error:(err)=>{
          this.errorMsg = "Unable to show at this time , please try after some time"
        }
      })
      
    })
      
  }

  next(){
    this.page = this.page+1;
    this.getLoanDetails();

  }
  prev(){
    if(this.page>0){
      this.page = this.page-1;
      this.getLoanDetails();
    }

  }

  onClick(i:number){
    this.page = i
    this.getLoanDetails();
 }

 



}



// loans = [
//   { date: '2024-11-26', 
//     loanType: 'PROPERTY', 
//     amount: 5000000, 
//     status: 'APPROVED'
//   }, 
//   { 
//     date: '2024-11-26', 
//     loanType: 'STUDY',
//     amount: 200000 ,
//     status: 'PENDING', 
//   },
//   { 
//     date: '2024-11-26', 
//     loanType: 'HOME', 
//     amount: 2000,
//     status: 'NOT_APPROVED' 
//   }
// ]
