import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../service/account.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-card-apply',
  imports: [NgIf],
  templateUrl: './card-apply.component.html',
  styleUrl: './card-apply.component.css'
})
export class CardApplyComponent implements OnInit{

  successMsg:string|undefined;
  errorMsg:string|undefined;
  aid:any;

  constructor(private accountService:AccountService,private actRoute:ActivatedRoute){

  }
  ngOnInit(): void {
    this.actRoute?.parent?.paramMap.subscribe(p=>{
      this.aid = p.get('id');
    })
  }

  applyForCard(cardType:any){

    console.log(cardType);
    // cardType = JSON.stringify(cardType);
    // console.log(cardType);
    let obj={
      cardType:cardType
    }
    
    
    this.accountService.applyForCard(obj,this.aid).subscribe({
      next:(data)=>{
        this.successMsg = "Thanks for applying for the "+cardType+" card.Please check in card-details for more";
      },
      error:(err)=>{
        this.errorMsg = "Please try after some time ...";
      }
    })


  }


}
