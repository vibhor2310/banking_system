import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account-dashboard',
  imports: [],
  templateUrl: './account-dashboard.component.html',
  styleUrl: './account-dashboard.component.css'
})
export class AccountDashboardComponent {

  aid:any;

  constructor(private actRoute:ActivatedRoute){
    this.actRoute.paramMap.subscribe(p=>{
      this.aid = p.get('id');
      
    })
  }

  getAccountId(){
    return this.aid;
  }

}
